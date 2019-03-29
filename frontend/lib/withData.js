import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, prodEndPoint } from '../config';
import { ALL_USER_CRYPTO_CURRENCIES_QUERY } from '../components/Portfolio';

function createClient({ headers }) {
	return new ApolloClient({
		// need to fetch the endpoint from the lambda first, then return output here
		// for now, i am directly exposing the backend prod link. Maybe this is ok though?
		uri: process.env.NODE_ENV === 'production' ? `https://cryptfolio-yoga-prod.herokuapp.com` : endpoint,
		request: (operation) => {
			operation.setContext({
				fetchOptions: {
					credentials: 'include'
				},
				headers
			});
		},
		clientState: {
			resolvers: {
				Mutation: {
					toggleAlreadyOwned(_, variables, { cache }) {
						let alreadyOwned = [];
						const cryptosOwned = cache.readQuery({
							query: ALL_USER_CRYPTO_CURRENCIES_QUERY
						});
						cryptosOwned.cryptoCurrencies.map((crypto) => {
							return alreadyOwned.push(crypto.name);
						});
						const data = {
							data: { alreadyOwned: alreadyOwned }
						};
						cache.writeData(data);
						return data;
					}
				}
			},
			defaults: {
				alreadyOwned: []
			}
		}
	});
}

export default withApollo(createClient);
