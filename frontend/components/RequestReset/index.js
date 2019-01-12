import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form, { FormButton } from '../Form';
import Error from '../Error';
import { SuccessMessage } from './style';

const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION($email: String!) {
		requestReset(email: $email) {
			message
		}
	}
`;

class RequestReset extends Component {
	state = {
		email: ''
	};

	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	isStateEmpty = () => {
		const { email, password } = this.state;
		return email.length === 0 ? true : false;
	};
	render() {
		return (
			<Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
				{(reset, { error, loading, called }) => (
					<Form
						method="post"
						onSubmit={async (e) => {
							e.preventDefault();
							await reset();
							this.setState({ email: '' });
						}}
					>
						<fieldset disabled={loading} aria-busy={loading}>
							<h2>Request a password reset</h2>
							<Error error={error} />
							{!error &&
							!loading &&
							called && <SuccessMessage> Success! Check your email for a reset link.</SuccessMessage>}
							<label htmlFor="email">
								Email
								<input
									type="email"
									name="email"
									placeholder="enter your email"
									value={this.state.email}
									onChange={this.saveToState}
								/>
							</label>

							<FormButton disabled={this.isStateEmpty()} type="submit">
								Request reset
							</FormButton>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default RequestReset;
