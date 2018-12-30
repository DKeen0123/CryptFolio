import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from '../Header';
import Meta from '../Meta';
import Footer from '../Footer';

const theme = {
	colors: {
		neutral: {
			xlight: '#EAEAEA',
			light: '#D1D1D1',
			midlight: '#878787',
			base: '#707070',
			middark: '#545454',
			dark: '#424242',
			xdark: '#333333'
		}
	},
	maxWidth: '1200px'
};

const StyledPage = styled.div`
	background: white;
	color: ${(props) => props.theme.colors.neutral.xdark};
	position: relative;
	min-height: 100%;
	padding-bottom: 120px;
`;

const Inner = styled.div`
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto;
	padding: 2rem;
`;

injectGlobal`
  @font-face {
		font-family: 'Montserrat', sans-serif;
    src: url('/static/Montserrat-Regular.ttf') format('ttf');
    font-weight: normal;
    font-style: normal;
	}
	#__next {
		height: 100%;
	}
  html {
		margin: 0;
		padding: 0;
    box-sizing: border-box;
		font-size: 10px;
		color: ${(props) => props.theme.colors.neutral.xdark};
		height: 100%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
		padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
		font-family: 'Montserrat';
		opacity: 1;
		transition: 1s opacity;
		height: 100%;
	}
	body.fade-out {
		opacity: 0;
		transition: none;
	}
  a {
    text-decoration: none;
    color: ${theme.colors.neutral.xdark};
  }
  button {  font-family: 'Montserrat'; }
`;

class Page extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<StyledPage>
					<Meta />
					<Header />
					<Inner>{this.props.children}</Inner>
					<Footer />
				</StyledPage>
			</ThemeProvider>
		);
	}
}

export default Page;
