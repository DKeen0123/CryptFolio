const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

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
	},
	async requestReset(parent, args, ctx, info) {
		const user = await ctx.db.query.user({ where: { email: args.email } });
		if (!user) {
			throw new Error(`No such user found for email ${args.email}`);
		}
		const resetToken = (await promisify(randomBytes)(20)).toString('hex');
		const resetTokenExpiry = Date.now() + 3600000; // one hour from now.
		const res = await ctx.db.mutation.updateUser({
			where: { email: args.email },
			data: { resetToken, resetTokenExpiry }
		});
		console.log(res);
		return { message: 'Thanks' };
	},
	async resetPassword(parents, args, ctx, info) {
		if (args.password !== args.confirmPassword) {
			throw new Error("These passwords don't match!");
		}
		const [ user ] = await ctx.db.query.users({
			where: {
				resetToken: args.resetToken,
				resetTokenExpiry_gte: Date.now() - 3600000
			}
		});
		if (!user) {
			throw new Error('This token is either invalid or has expired!');
		}
		const password = await bcrypt.hash(args.password, 10);
		const updatedUser = await ctx.db.mutation.updateUser({
			where: { email: user.email },
			data: {
				password,
				resetToken: null,
				resetTokenExpiry: null
			}
		});
		const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});
		return updatedUser;
	}
};

module.exports = Mutations;
