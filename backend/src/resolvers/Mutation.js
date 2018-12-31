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
	}
};

module.exports = Mutations;
