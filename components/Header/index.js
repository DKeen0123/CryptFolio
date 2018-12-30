import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import styled from 'styled-components';
import Nav from '../Nav';

Router.onRouteChangeStart = () => {
	NProgress.start();
};
Router.onRouteChangeComplete = () => {
	NProgress.done();
};
Router.onRouteChangeError = () => {
	NProgress.done();
};

const MainWrapper = styled.div`
	max-width: ${(props) => props.theme.maxWidth};
	margin: auto;
`;

const LogoWrapper = styled.div`
	position: relative;
	z-index: 2;
	font-size: 2rem;
	padding-left: 2rem;

	a {
		padding: 0.5rem 1rem;

		p {
			margin: 0;
		}
	}
`;

const StyledHeader = styled.header`
	background-color: ${(props) => props.theme.colors.neutral.xlight};
	border-bottom: 1px solid ${(props) => props.theme.colors.neutral.base};

	.bar {
		display: grid;
		grid-template-columns: auto 1fr;
		justify-content: space-between;
		align-items: stretch;
	}
`;

const Header = () => (
	<StyledHeader>
		<MainWrapper>
			<div className="bar">
				<LogoWrapper>
					<Link href="/">
						<a>
							<p>CryptFolio</p>
						</a>
					</Link>
				</LogoWrapper>
				<Nav />
			</div>
		</MainWrapper>
	</StyledHeader>
);

export default Header;
