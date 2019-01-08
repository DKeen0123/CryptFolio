import Link from 'next/link';
import NavStyles from './style';
import User from '../User';
import Signout from '../Signout';

const Nav = () => (
	<User>
		{({ data: { me } }) => (
			<NavStyles data-test="nav">
				{!me && (
					<Link href="/signup">
						<a>Sign up</a>
					</Link>
				)}
				{me && (
					<>
					<Link href="/portfolio">
						<a>Portfolio</a>
					</Link>
					<Signout />
					</>
				)}
			</NavStyles>
		)}
	</User>
);

export default Nav;
