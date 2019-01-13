import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../User';
import Form, { FormButton } from '../Form';
import Error from '../Error';

const ADD_CRYPTO_CURRENCY_MUTATION = gql`
	mutation ADD_CRYPTO_CURRENCY_MUTATION($name: String!, $amount: Float!, $totalPaidInCents: Float!) {
		createCryptoCurrency(name: $name, amount: $amount, totalPaidInCents: $totalPaidInCents) {
			id
			name
			amount
		}
	}
`;

class AddCrypto extends Component {
	state = {
		amount: 0,
		amountPaidFor: 0
	};

	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	isStateEmpty = () => {
		const { amount, amountPaidFor } = this.state;
		return amount === 0 || amountPaidFor === 0 ? true : false;
	};
	render() {
		return (
			<Mutation
				mutation={ADD_CRYPTO_CURRENCY_MUTATION}
				variables={{
					name: this.props.name,
					amount: this.state.amount * 100,
					totalPaidInCents: this.state.amountPaidFor * 100
				}}
			>
				{(createCryptoCurrency, { error, loading }) => (
					<Form
						method="post"
						onSubmit={async (e) => {
							e.preventDefault();
							const res = await createCryptoCurrency();
							console.log(res);
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

							<FormButton disabled={this.isStateEmpty()} type="submit">
								Add to portfolio
							</FormButton>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default AddCrypto;
