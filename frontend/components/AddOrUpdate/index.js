import React from 'react';
import gql from 'graphql-tag';
import AddCrypto from '../AddCrypto';

const LOCAL_STATE_QUERY = gql`
	query {
		alreadyOwned @client
	}
`;

const AddOrUpdate = ({ cryptoCurrencies, chosenCrypto }) => {
	return (
		<div>
			{console.log(
				cryptoCurrencies.filter((crypto) => {
					return crypto.name === chosenCrypto;
				})
			)}
			{cryptoCurrencies.filter((crypto) => {
				return crypto.name === chosenCrypto;
			}).length > 0 ? (
				<p>Already owned!</p>
			) : (
				<AddCrypto name={chosenCrypto} />
			)}
		</div>
	);
};

export default AddOrUpdate;

export { LOCAL_STATE_QUERY };
