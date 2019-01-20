import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../User';
import Form, { FormButton } from '../Form';
import Error from '../Error';

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		signin(email: $email, password: $password) {
			id
			email
			name
		}
	}
`;

class Signin extends Component {
	state = {
		email: '',
		password: ''
	};

	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	isStateEmpty = () => {
		const { email, password } = this.state;
		return email.length === 0 || password.length === 0 ? true : false;
	};
	render() {
		return (
			<Mutation mutation={SIGNIN_MUTATION} variables={this.state} refetchQueries={[ { query: CURRENT_USER_QUERY } ]}>
				{(signin, { error, loading }) => (
					<Form
						method="post"
						onSubmit={async (e) => {
							e.preventDefault();
							const res = await signin();
							this.setState({ email: '', password: '' });
						}}
					>
						<fieldset disabled={loading} aria-busy={loading}>
							<h2>Sign in</h2>
							<Error error={error} />
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
							<label htmlFor="password">
								Password
								<input
									type="password"
									name="password"
									placeholder="enter your password"
									value={this.state.password}
									onChange={this.saveToState}
								/>
							</label>

							<FormButton disabled={this.isStateEmpty()} type="submit">
								Sign in
							</FormButton>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default Signin;
