import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import { setErrors, setValidity } from 'v-react';

class Users extends React.Component{
	constructor(props, context){
		super(props, context);
		this.state = {
			user: {name: '', description: ''},
			userName: {
				isDirty: false,
				hasError: false,
				errorMessage: '',
				validationState: 'VALIDATION_NEUTRAL'
			}
		};

		this.onNameChange = this.onNameChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onSaveData = this.onSaveData.bind(this);
	}

	onNameChange(e){
		const _user = this.state.user;
		_user.name = e.target.value;
		const validations = {
			isRequired: { 
					value: true, 
					message: 'required field it is' 
				},
			maxLength: { 
					value: 11, message: 'max length is 11' },
					minLength: { value: 10, message: 'min length is 10' }
				}
		const params = {
			group: 'sample-group', // Group a set of validations with a unique name.
			name: 'sample-name', // Unique name for the validation. This should be different for each of the field.
			value: e.target.value, // Value to be validated.
			validations,
			isDirty: true, // Only if you set this value to true, validations check will be performed.
			fieldName: 'userName', // Name of the field to be validated
			state: Object.assign({}, this.state), // Local state, only if you have followed the STEP 3,
			setError: this.props.errorActions.setErrors // Fetch the set error function from 'v-react' and pass it on the set validity function
		};
		const result = setValidity(params);
		console.log(result);
		this.setState({ 'userName': params.state['userName']});

		this.setState({user: _user});
	}

	onDescriptionChange(e){
		const _user = this.state.user;
		_user.description = e.target.value;
		this.setState({user: _user});
	}

	onSaveData(e){
		this.props.saveUser(this.state.user);
	}

	renderUsersRow(user, index){
		var descId = 'desc' + index;
		return <li className='user-item col-md-12'><div key={index} className="col-md-12"><b>User Name:</b> {user.name}</div>  <div key={descId} className="col-md-12"><b>Description:</b> {user.description}</div></li>;
	}

	render(){
		const validationMessageStyle = {
			color: 'red'
		},
		validationInputStyle = {
			'border-color': 'red'
		}
		return (<section className="jumbotron col-md-12">
					<section className="col-md-4">
						<h3>Add User</h3>
						<div className="form-group">
							<label>User Name:</label>
							<input	name="userName"	type="text"	style={this.state.userName.hasError ? validationInputStyle : {} } onChange={this.onNameChange}	className="form-control"	value={this.state.user.name}/>
							<span style={validationMessageStyle}>{this.state.userName.errorMessage}</span>
						</div>
						<div className="form-group">
							<label>Description:</label>
							<textarea type="text" className="form-control" onChange={this.onDescriptionChange} value={this.state.user.description}></textarea>
						</div>
						<button className="btn btn-primary" onClick={this.onSaveData}>Save</button>
					</section>
					<section className="col-md-6">
						<h3>My Users</h3>
						<ul>{this.props.users.map(this.renderUsersRow)}</ul>
					</section>
				</section>
				);
	}
}

Users.propTypes = {
	users: PropTypes.array.isRequired,
	saveUser: PropTypes.func.isRequired,
	errorActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
	return{
		users: state.users
	};
}

function mapDispatchToProps(dispatch){
	return {
		saveUser: user => dispatch(userActions.saveUser(user)),
		errorActions: bindActionCreators({setErrors}, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);