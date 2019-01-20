import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../User';
import Form, { FormButton } from '../Form';
import Error from '../Error';

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
		signup(email: $email, name: $name, password: $password) {
			id
			email
			name
		}
	}
`;

class Signup extends Component {
	state = {
		name: '',
		email: '',
		password: ''
	};

	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	isStateEmpty = () => {
		const { name, email, password } = this.state;
		return name.length === 0 || email.length === 0 || password.length === 0 ? true : false;
	};
	render() {
		return (
			<Mutation mutation={SIGNUP_MUTATION} variables={this.state} refetchQueries={[ { query: CURRENT_USER_QUERY } ]}>
				{(signup, { error, loading }) => (
					<Form
						method="post"
						onSubmit={async (e) => {
							e.preventDefault();
							const res = await signup();
							this.setState({ name: '', email: '', password: '' });
						}}
					>
						<fieldset disabled={loading} aria-busy={loading}>
							<h2>Signup for an account</h2>
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
							<label htmlFor="name">
								Name
								<input
									type="text"
									name="name"
									placeholder="enter your name"
									value={this.state.name}
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
								Sign up
							</FormButton>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default Signup;
