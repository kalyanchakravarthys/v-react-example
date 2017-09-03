import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Components/App';
import Home from './Components/home/Home';
import About from './Components/about/About';
import Drugs from './Components/drugs/Drugs';

export default(
	<Route path='/' component ={App}>
		<IndexRoute component={Home}/>
		<Route path='about' component={About}/>
		<Route path='drugs' component={Drugs}/>
	</Route>
)

