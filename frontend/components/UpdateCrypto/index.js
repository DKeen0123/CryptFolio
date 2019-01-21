import React, { Component, Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_USER_CRYPTO_CURRENCIES_QUERY } from '../Portfolio';
import Form, { FormButton } from '../Form';
import Error from '../Error';

const SINGLE_CRYPTO_CURRENCY_QUERY = gql`
	query SINGLE_CRYPTO_CURRENCY_QUERY($id: ID!) {
		cryptoCurrency(where: { id: $id }) {
			id
			name
			amount
			totalPaidInCents
		}
	}
`;

const UPDATE_CRYPTO_CURRENCY_MUTATION = gql`
	mutation UPDATE_CRYPTO_CURRENCY_MUTATION($id: ID!, $amount: Float, $totalPaidInCents: Float) {
		updateCryptoCurrency(id: $id, amount: $amount, totalPaidInCents: $totalPaidInCents) {
			id
			name
			amount
			totalPaidInCents
		}
	}
`;

class UpdateCrypto extends Component {
	state = {
		amount: 0,
		amountPaidFor: 0
	};

	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<Query query={SINGLE_CRYPTO_CURRENCY_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading }) => {
					if (loading) return <p>Loading...</p>;
					return (
						<Fragment>
							<Mutation
								mutation={UPDATE_CRYPTO_CURRENCY_MUTATION}
								variables={{
									id: this.props.id,
									name: this.props.name,
									amount: this.state.amount + data.cryptoCurrency.amount,
									totalPaidInCents: this.state.amountPaidFor * 100 + data.cryptoCurrency.totalPaidInCents
								}}
								refetchQueries={[ { query: ALL_USER_CRYPTO_CURRENCIES_QUERY } ]}
							>
								{(updateCryptoCurrency, { error, loading }) => (
									<Form
										method="post"
										onSubmit={async (e) => {
											e.preventDefault();
											const res = await updateCryptoCurrency();
											this.setState({ amount: 0, amountPaidFor: 0 });
										}}
									>
										<fieldset disabled={loading} aria-busy={loading}>
											<Error error={error} />
											<label htmlFor="amount">
												Amount
												<input
													type="number"
													name="amount"
													placeholder="amount bought"
													value={this.state.amount}
													onChange={this.saveToState}
												/>
											</label>
											<label htmlFor="amountPaidFor">
												Price obtained
												<input
													type="number"
													name="amountPaidFor"
													placeholder="enter the amount you paid"
													value={this.state.amountPaidFor}
													onChange={this.saveToState}
												/>
											</label>

											<FormButton type="submit">Update</FormButton>
										</fieldset>
									</Form>
								)}
							</Mutation>
						</Fragment>
					);
				}}
			</Query>
		);
	}
}

export default UpdateCrypto;
