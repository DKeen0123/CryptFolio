import Link from 'next/link';
import NavStyles from './style';
import User from '../User';

const Nav = () => (
	<NavStyles data-test="nav">
		<User>
			{({ data: { me } }) => {
				console.log(me);
				if (me) return <p>{me.name}</p>;
				return null;
			}}
		</User>
		<Link href="/signup">
			<a>Sign up</a>
		</Link>
		<Link href="/portfolio">
			<a>Portfolio</a>
		</Link>
	</NavStyles>
);

export default Nav;
