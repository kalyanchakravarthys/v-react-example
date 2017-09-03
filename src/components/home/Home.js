import React from 'react';
import {Link} from 'react-router';

class Home extends React.Component{
	render(){
		return (
			<div className='jumbotron'>
				<h2>Home Page</h2>
				<p>This is home page !</p>
				<Link to='about' className='btn btn-primary btn-lg'>Learn more !</Link>
			</div>
			)
	}
}

export default Home;