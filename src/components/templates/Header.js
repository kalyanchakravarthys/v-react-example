import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
	return (
			<nav>
				<ul className='nav nav-tabs'>
					<li><IndexLink to='/' activeClassName='active'><span className='glyphicon glyphicon-home'></span></IndexLink></li>
					<li><Link to='/about' activeClassName='active'>About</Link></li>
				</ul>
			</nav>
		);
};

export default Header;