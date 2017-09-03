import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const LeftMenu = () => {
	return (
			<div className='no-padding'>
				<nav className='left-menu'>
					<ul className='nav nav-pills nav-stacked'>
						<li><IndexLink to='/' activeClassName='active'>Page 1</IndexLink></li>
						<li><Link to='/drugs' activeClassName='active'>Page 2</Link></li>
						<li><Link to='/about' activeClassName='active'>Page 3</Link></li>
						<li><Link to='/about' activeClassName='active'>Page 4</Link></li>
					</ul>
				</nav>
			</div>
		);
};

export default LeftMenu;