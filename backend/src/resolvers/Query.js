const { forwardTo } = require('prisma-binding');

const Query = {
	cryptoCurrencies: forwardTo('db')
};

module.exports = Query;
