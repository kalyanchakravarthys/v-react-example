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
			},
			customField: {
				isDirty: false,
				hasError: false,
				errorMessage: '',
				validationState: 'VALIDATION_NEUTRAL'
			}
		};

		this.onNameChange = this.onNameChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onSaveData = this.onSaveData.bind(this);
		this.validate = this.validate.bind(this);
		this.onCustomValidationChange = this.onCustomValidationChange.bind(this);
		this.validationConfig = {
			name: {
				isRequired: { 
						value: true, 
						message: 'required field it is' 
					},
				maxLength: { 
						value: 11, message: 'max length is 11' },
						minLength: { value: 10, message: 'min length is 10' }
					},
			customField : {
				custom: [
					{
						name: 'customValidation1',
						action: function(value) { 
							debugger;
							return value ? value.indexOf('a') >= 0 : false 
						},
						message: 'this field should not contain character a'
					}
				]
			}
		}
	}


	validate(value, fieldName, validations) {
		const params = {
			group: 'sample-group', // Group a set of validations with a unique name.
			name: fieldName, // Unique name for the validation. This should be different for each of the field.
			value, // Value to be validated.
			validations,
			isDirty: true, // Only if you set this value to true, validations check will be performed.
			fieldName: fieldName, // Name of the field to be validated
			state: Object.assign({}, this.state), // Local state, only if you have followed the STEP 3,
			setError: this.props.errorActions.setErrors // Fetch the set error function from 'v-react' and pass it on the set validity function
		};
		const result = setValidity(params);
		const newState = Object.assign({}, this.state)
		newState[fieldName] = params.state[fieldName]
		this.setState(newState);
		return params.state[fieldName];
	}

	onNameChange(e){
		this.validate(e.target.value, 'userName', this.validationConfig.name)
		const newUser = Object.assign({}, this.state.user)
		newUser.name = e.target.value
		this.setState({user: newUser});
	}

	onDescriptionChange(e){
		const newUser = Object.assign({}, this.state.user)
		newUser.description = e.target.value
		this.setState({user: newUser});
	}

	onCustomValidationChange(e) {
		this.validate(e.target.value, 'customField', this.validationConfig.customField)
		const newUser = Object.assign({}, this.state.user)
		newUser.customField = e.target.value
		this.setState({user: newUser});
	}

	onSaveData(e){
		e.preventDefault()
		const result = this.validate(e.target.value, 'userName', this.validationConfig.name)
		if(!result.hasError){
			this.props.saveUser(this.state.user);
		} else {
			 alert('please fix validation issues')
		}
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
							<label>* User Name:</label>
							<input	name="userName"	type="text"	style={this.state.userName.hasError ? validationInputStyle : {} } onChange={this.onNameChange}	className="form-control"	value={this.state.user.name}/>
							<span style={validationMessageStyle}>{this.state.userName.errorMessage}</span>
						</div>
						<div className="form-group">
							<label>Description:</label>
							<textarea type="text" className="form-control" onChange={this.onDescriptionChange} value={this.state.user.description}></textarea>
						</div>
						<div className="form-group">
							<label>Custom Validation(Field Without vowels):</label>
							<textarea type="text" className="form-control" onChange={this.onCustomValidationChange} value={this.state.user.customField}></textarea>
							<span style={validationMessageStyle}>{this.state.customField.errorMessage}</span>
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