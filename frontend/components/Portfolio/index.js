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

const Portfolio = (props) => (
	<div>
		<p>Portfolio</p>
		<h3>Select a CryptoCurrency:</h3>
		<select name="cryptos">
			{console.log(props)}
			{props.data.map((crypto) => (
				<option value={crypto.name} key={crypto.name}>
					{crypto.name}
				</option>
			))}
		</select>
		{/* <Query query={ALL_USER_CRYPTO_CURRENCIES_QUERY}>
			{({ data, error, loading }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p> error: {error.message}</p>;
				return (
					<CryptoCurrencyList>
						{data.cryptoCurrencies.map((crypto) => <CryptoCurrency cryptoCurrency={crypto} key={crypto.id} />)}
					</CryptoCurrencyList>
				);
			}}
		</Query> */}
	</div>
);

export default Portfolio;
