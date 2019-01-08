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
	}
};

module.exports = Mutations;
