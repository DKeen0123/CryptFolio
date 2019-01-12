import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Form, { FormButton } from '../Form';
import Error from '../Error';
import { CURRENT_USER_QUERY } from '../User';

const RESET_MUTATION = gql`
	mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
		resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
			id
			email
			name
		}
	}
`;

class Reset extends Component {
	static propTypes = {
		resetToken: PropTypes.string.isRequired
	};

	state = {
		password: '',
		confirmPassword: ''
	};

	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	isStateEmpty = () => {
		const { password, confirmPassword } = this.state;
		return password.length === 0 || confirmPassword.length === 0 ? true : false;
	};

	render() {
		return (
			<Mutation
				mutation={RESET_MUTATION}
				variables={{
					resetToken: this.props.resetToken,
					password: this.state.password,
					confirmPassword: this.state.confirmPassword
				}}
				refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
			>
				{(reset, { error, loading }) => (
					<Form
						method="post"
						onSubmit={async (e) => {
							e.preventDefault();
							await reset();
							this.setState({ password: '', confirmPassword: '' });
							Router.push('/');
						}}
					>
						<fieldset disabled={loading} aria-busy={loading}>
							<h2>Reset your password</h2>
							<Error error={error} />
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
							<label htmlFor="confirmPassword">
								Confirm your password
								<input
									type="password"
									name="confirmPassword"
									placeholder="confirm your password"
									value={this.state.confirmPassword}
									onChange={this.saveToState}
								/>
							</label>

							<FormButton disabled={this.isStateEmpty()} type="submit">
								Reset password
							</FormButton>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default Reset;
