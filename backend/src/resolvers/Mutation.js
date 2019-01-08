const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
	async createCryptoCurrency(parent, args, ctx, info) {
		// TODO: Check if they're logged in

		const cryptoCurrency = await ctx.db.mutation.createCryptoCurrency(
			{
				data: {
					...args
				}
			},
			info
		);

		return cryptoCurrency;
	},
	async signup(parent, args, ctx, info) {
		args.email = args.email.toLowerCase();
		// hash password
		const password = await bcrypt.hash(args.password, 10);
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password,
					permissions: { set: [ 'USER' ] }
				}
			},
			info
		);
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});
		return user;
	},
	async signin(parents, { email, password }, ctx, info) {
		const user = await ctx.db.query.user({ where: { email } });
		if (!user) {
			throw new Error(`No such user found for email ${email}`);
		}

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Invalid password!');
		}

		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});
		return user;
	},
	signout(parent, args, ctx, info) {
		ctx.response.clearCookie('token');
		return { message: 'Goodbye!' };
	}
};

module.exports = Mutations;
