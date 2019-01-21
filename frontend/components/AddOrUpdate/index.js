import React from 'react';
import gql from 'graphql-tag';
import AddCrypto from '../AddCrypto';
import UpdateCrypto from '../UpdateCrypto';

const LOCAL_STATE_QUERY = gql`
	query {
		alreadyOwned @client
	}
`;

const AddOrUpdate = ({ cryptoCurrencies, chosenCrypto }) => {
	return (
		<div>
			{cryptoCurrencies.filter((crypto) => {
				return crypto.name === chosenCrypto;
			}).length > 0 ? (
				<UpdateCrypto
					name={chosenCrypto}
					id={cryptoCurrencies.filter((crypto) => crypto.name === chosenCrypto)[0].id}
				/>
			) : (
				<AddCrypto name={chosenCrypto} />
			)}
		</div>
	);
};

export default AddOrUpdate;

export { LOCAL_STATE_QUERY };
