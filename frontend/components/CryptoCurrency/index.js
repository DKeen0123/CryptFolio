import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { calculateProfit } from '../../helpers/profit';

class CryptoCurrency extends Component {
	static propTypes = {
		cryptoCurrency: PropTypes.object.isRequired
	};

	render() {
		const { cryptoCurrency, currentPrice } = this.props;
		return (
			<div>
				<h3>{cryptoCurrency.name}</h3>
				<h5>amount owned: {cryptoCurrency.amount}</h5>
				<h5> amount paid: ${(cryptoCurrency.totalPaidInCents / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h5>
				<h5>Profit: ${calculateProfit(cryptoCurrency.amount, cryptoCurrency.totalPaidInCents, currentPrice)}</h5>
			</div>
		);
	}
}

export default CryptoCurrency;
