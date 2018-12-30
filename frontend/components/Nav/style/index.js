import styled from 'styled-components';
import { rem } from 'polished';

const NavStyles = styled.ul`
	margin: 0;
	padding: 0;
	display: flex;
	justify-self: end;
	font-size: 2rem;
	a,
	button {
		padding: 1rem 3rem;
		display: flex;
		align-items: center;
		position: relative;
		font-size: 1em;
		background: none;
		border: 0;
		cursor: pointer;
		@media (max-width: 700px) {
			font-size: ${rem('24px')};
			padding: 0 10px;
		}
		&:after {
			height: 2px;
			background: ${(props) => props.theme.colors.neutral.xdark};
			content: '';
			width: 0;
			position: absolute;
			transform: translateX(-50%);
			transition: width 0.4s;
			transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
			left: 50%;
			margin-top: 2rem;
		}
		&:hover,
		&:focus {
			outline: none;
			&:after {
				width: calc(100% - 60px);

				@media (max-width: 700px) {
					width: calc(100% - 30px);
				}
			}
		}
	}
`;

export default NavStyles;
