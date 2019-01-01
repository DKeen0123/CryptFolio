import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

const CryptoTicker = ({ name, price, marketCap, image }) => (
	<TickerWrapper>
		<TickerHeading>
			<TickerTitle>{name}</TickerTitle>
			<TickerImage src={image} />
		</TickerHeading>
		<TickerPrice>
			<TickerContentTitle>Price:</TickerContentTitle>
			<p>${price}</p>
		</TickerPrice>
		<TickerMarketCap>
			<TickerContentTitle>Market&nbsp;Cap:</TickerContentTitle>
			<p>${marketCap}</p>
		</TickerMarketCap>
	</TickerWrapper>
);

const TickerWrapper = styled.div`
	border: black 1px solid;
	padding: ${(rem('8px'), rem('16px'))};
	text-align: center;
`;

const TickerHeading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const TickerImage = styled.img`
	height: auto;
	width: auto;
	max-width: 42px;
	max-height: 40px;
`;

const TickerTitle = styled.h3`margin-right: 8px;`;

const TickerContentTitle = styled.h4`margin-right: ${rem('8px')};`;

const TickerPrice = styled.div`
	display: flex;
	justify-content: center;
`;

const TickerMarketCap = styled.div`
	display: flex;
	justify-content: center;
`;

// const formatter = (currency) => {
// 	const locale = getLocale(currency);
// 	const currencyToShow = currency ? currency.toUpperCase() : 'usd';
// 	return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyToShow });
// };

// const getLocale = (currency) => {
// 	switch (currency) {
// 		case 'usd':
// 			'en-US';
// 			break;
// 		case 'gbp':
// 			'en-GB';
// 			break;
// 		case 'eur':
// 			'eu-EU';
// 			break;
// 		default:
// 			'en-US';
// 			break;
// 	}
// };

export default CryptoTicker;
