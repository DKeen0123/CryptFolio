import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

function createClient({ headers }) {
	return new ApolloClient({
		uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
		request: (operation) => {
			operation.setContext({
				fetchOptions: {
					credentials: 'include'
				},
				headers
			});
		},
		clientState: {
			addTypename: false,
			resolvers: {},
			defaults: {}
		}
	});
}

export default withApollo(createClient);
