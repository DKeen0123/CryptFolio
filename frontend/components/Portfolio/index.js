import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import CryptoCurrency from '../CryptoCurrency';
import CryptoTicker, { TickerWrapper } from '../CryptoTicker';
import AddOrUpdate from '../AddOrUpdate';
import SignInPrompt from '../SignInPrompt';

const ALL_USER_CRYPTO_CURRENCIES_QUERY = gql`
	query ALL_USER_CRYPTO_CURRENCIES_QUERY {
		cryptoCurrencies {
			id
			name
			amount
			totalPaidInCents
		}
	}
`;

const TOGGLE_ALREADY_OWNED_MUTATION = gql`
	mutation {
		toggleAlreadyOwned @client
	}
`;

const CryptoCurrencyList = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 20px;
	max-width: ${(props) => props.theme.maxWidth};
`;

class Portfolio extends Component {
	state = {
		chosenCrypto: this.props.data[0].name
	};

	handleOnChange = (e) => this.setState({ chosenCrypto: e.target.value });

	render() {
		const crypto = this.props.data.find((crypto) => crypto.name === this.state.chosenCrypto);
		return (
			<Query query={ALL_USER_CRYPTO_CURRENCIES_QUERY}>
				{({ data, error, loading }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p> error: {error.message}</p>;

					return (
						<Fragment>
							{console.log(data)}
							<p>Portfolio</p>
							<h3>Select a CryptoCurrency:</h3>
							<select
								onChange={(e) => {
									this.handleOnChange(e);
								}}
								name="cryptos"
							>
								{this.props.data.map((crypto) => (
									<option value={crypto.name} key={crypto.id}>
										{crypto.name}
									</option>
								))}
							</select>
							<TickerWrapper>
								<CryptoTicker
									name={crypto.name}
									price={crypto.current_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
									marketCap={crypto.market_cap.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
									image={crypto.image}
								>
									<SignInPrompt>
										<AddOrUpdate cryptoCurrencies={data.cryptoCurrencies} chosenCrypto={this.state.chosenCrypto} />
									</SignInPrompt>
								</CryptoTicker>
							</TickerWrapper>
							<CryptoCurrencyList>
								{data.cryptoCurrencies.map((crypto) => {
									return <CryptoCurrency cryptoCurrency={crypto} key={crypto.id} />;
								})}
							</CryptoCurrencyList>
						</Fragment>
					);
				}}
			</Query>
		);
	}
}

export default Portfolio;

export { ALL_USER_CRYPTO_CURRENCIES_QUERY };

export { TOGGLE_ALREADY_OWNED_MUTATION };
