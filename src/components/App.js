import React, {PropTypes} from 'react';
import Header from './templates/Header';
import LeftMenu from './templates/LeftMenu';
class App extends React.Component{
	render() {
		return(
				<div className="container-fluid">
					<Header/>
					<div className='col-md-12 '>
					</div>
					<div className='col-md-2 no-padding'>
						<LeftMenu/>
					</div>
					<div className='col-md-10 '>
						{this.props.children}
					</div>
				</div>
			);
	}
}

App.PropTypes = {
	children: PropTypes.object.isRequired
}

export default App;