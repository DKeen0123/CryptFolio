import Link from 'next/link';
import NavStyles from './style';

const Nav = () => (
	<NavStyles data-test="nav">
		<Link href="/">
			<a>Sign in</a>
		</Link>
		<Link href="/">
			<a>Portfolio</a>
		</Link>
	</NavStyles>
);

export default Nav;
