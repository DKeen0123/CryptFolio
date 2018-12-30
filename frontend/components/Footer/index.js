import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

const FooterWrapper = styled.div`
	display: flex;
	align-items: center;
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 100px;
	background-color: ${(props) => props.theme.colors.neutral.xdark};
`;

const FooterContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	width: ${(props) => props.theme.maxWidth};
	color: ${(props) => props.theme.colors.neutral.xlight};
	margin: auto;

	p {
		margin: 0;
	}
`;

const SocialsWrapper = styled.div`
	display: flex;
	a {
		flex: 1;
		display: flex;
		margin-right: ${rem('16px')};
	}
`;

const Footer = () => (
	<FooterWrapper>
		<FooterContent>
			<p>Copyright &#169; Daniel Keen 2019</p>
			<SocialsWrapper>
				<a href="https://github.com/DKeen0123" target="_blank">
					<img src="../../static/GitHub-Mark-Light-32px.png" />
				</a>
				<a href="https://www.linkedin.com/in/danielkeendev/" target="_blank">
					<img src="../../static/linkedin-icon.png" />
				</a>
			</SocialsWrapper>
		</FooterContent>
	</FooterWrapper>
);

export default Footer;
