import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import CryptoCurrency from '../CryptoCurrency';

const ALL_USER_CRYPTO_CURRENCIES_QUERY = gql`
	query ALL_USER_CRYPTO_CURRENCIES_QUERY {
		cryptoCurrencies {
			id
			name
			amount
		}
	}
`;

const CryptoCurrencyList = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 20px;
	max-width: ${(props) => props.theme.maxWidth};
`;

class Portfolio extends Component {
	render() {
		return (
			<div>
				<p>Portfolio</p>
				<Query query={ALL_USER_CRYPTO_CURRENCIES_QUERY}>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p> error: {error.message}</p>;
						return (
							<CryptoCurrencyList>
								{console.log(data.cryptoCurrencies)}
								{data.cryptoCurrencies.map((crypto) => <CryptoCurrency cryptoCurrency={crypto} key={crypto.id} />)}
							</CryptoCurrencyList>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default Portfolio;
