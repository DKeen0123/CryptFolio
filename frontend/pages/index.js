import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { rem } from 'polished';
import { coinGeckoApi } from '../config';
import CryptoTicker, { TickerWrapper } from '../components/CryptoTicker';

const HomeWrapper = styled.div`text-align: center;`;

const MainHeading = styled.h2`margin-bottom: ${rem('16px')};`;

const Home = (props) => (
	<HomeWrapper>
		<MainHeading>Top 12 by market cap</MainHeading>
		<TickerWrapper>
			{props.data.map(
				(crypto) =>
					crypto.id && (
						<CryptoTicker
							key={crypto.id}
							name={crypto.name}
							price={crypto.current_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
							marketCap={crypto.market_cap.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
							image={crypto.image}
						/>
					)
			)}
		</TickerWrapper>
	</HomeWrapper>
);

Home.getInitialProps = async function() {
	try {
		const response = await axios.get(`${coinGeckoApi}coins/markets`, {
			params: {
				vs_currency: 'usd',
				order: 'market_cap_desc',
				per_page: 12,
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

export default Home;
