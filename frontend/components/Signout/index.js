import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../User';
import { FormButton } from '../Form';

const SIGN_OUT_MUTATION = gql`
	mutation SIGN_OUT_MUTATION {
		signout {
			message
		}
	}
`;

const Signout = (props) => (
	<Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[ { query: CURRENT_USER_QUERY } ]}>
		{(signout) => <FormButton onClick={signout}>Sign out</FormButton>}
	</Mutation>
);

export default Signout;
