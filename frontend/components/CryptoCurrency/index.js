import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default class CryptoCurrency extends Component {
	static propTypes = {
		cryptoCurrency: PropTypes.object.isRequired
	};

	render() {
		const { cryptoCurrency } = this.props;
		return (
			<div>
				<h3>
					<Link
						href={{
							pathname: `/portfolio/${cryptoCurrency.name.toLowerCase()}`,
							query: { id: cryptoCurrency.id }
						}}
					>
						<a>{cryptoCurrency.name}</a>
					</Link>
				</h3>
				<h5>amount owned: {cryptoCurrency.amount}</h5>
				<h5> amount paid: ${(cryptoCurrency.totalPaidInCents / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h5>
			</div>
		);
	}
}
