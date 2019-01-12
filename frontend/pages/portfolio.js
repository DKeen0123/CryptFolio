import axios from 'axios';
import { coinGeckoApi } from '../config';
import Portfolio from '../components/Portfolio';

const PortfolioPage = (props) => {
	return (
		<div>
			<Portfolio data={props.data} />
		</div>
	);
};

PortfolioPage.getInitialProps = async function() {
	try {
		const response = await axios.get(`${coinGeckoApi}coins/markets`, {
			params: {
				vs_currency: 'usd',
				order: 'market_cap_desc',
				per_page: 100,
				page: 1
			}
		});

		const data = response.data;
		// TODO: Find out how to get this into apollo-link-state
		return { data };
	} catch (error) {
		console.log('error is: ', error);
	}
};

export default PortfolioPage;
