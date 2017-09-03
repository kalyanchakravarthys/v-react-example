import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as drugActions from '../../actions/drugActions';
import { setErrors, setValidity } from 'v-react';

class Drugs extends React.Component{
	constructor(props, context){
		super(props, context);
		this.state = {
			drug: {name: '', description: ''},
			drugName: {
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
		const _drug = this.state.drug;
		_drug.name = e.target.value;
		const validations = {
			isRequired: { 
					value: true, 
					message: 'error message' 
				},
			maxLength: { 
					value: 10, message: 'error message' },
					minLength: { value: 10, message: 'error message' }
				}
		const params = {
			group: 'sample-group', // Group a set of validations with a unique name.
			name: 'sample-name', // Unique name for the validation. This should be different for each of the field.
			value: e.target.value, // Value to be validated.
			validations,
			isDirty: true, // Only if you set this value to true, validations check will be performed.
			fieldName: 'drugName', // Name of the field to be validated
			state: Object.assign({}, this.state), // Local state, only if you have followed the STEP 3,
			setError: this.props.errorActions.setErrors // Fetch the set error function from 'v-react' and pass it on the set validity function
		};
		const result = setValidity(params);
		console.log(result);
		this.setState({ 'drugName': params.state['drugName']});

		this.setState({drug: _drug});
	}

	onDescriptionChange(e){
		const _drug = this.state.drug;
		_drug.description = e.target.value;
		this.setState({drug: _drug});
	}

	onSaveData(e){
		this.props.saveDrug(this.state.drug);
	}

	renderDrugsRow(drug, index){
		var descId = 'desc' + index;
		return <li className='drug-item col-md-12'><div key={index} className="col-md-12"><b>Drug Name:</b> {drug.name}</div>  <div key={descId} className="col-md-12"><b>Description:</b> {drug.description}</div></li>;
	}

	render(){
		return (<section className="jumbotron col-md-12">
					<section className="col-md-4">
						<h3>Add Drug</h3>
						<div className="form-group">
							<label>Drug Name:</label>
							<input	name="drugName"	type="text"		onChange={this.onNameChange}	className="form-control"	value={this.state.drug.name}/>
							<span>{this.state.drugName.errorMessage}</span>
						</div>
						<div className="form-group">
							<label>Description:</label>
							<textarea type="text" className="form-control" onChange={this.onDescriptionChange} value={this.state.drug.description}></textarea>
						</div>
						<button className="btn btn-primary" onClick={this.onSaveData}>Save</button>
					</section>
					<section className="col-md-6">
						<h3>My Drugs</h3>
						<ul>{this.props.drugs.map(this.renderDrugsRow)}</ul>
					</section>
				</section>
				);
	}
}

Drugs.propTypes = {
	drugs: PropTypes.array.isRequired,
	saveDrug: PropTypes.func.isRequired,
	errorActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
	return{
		drugs: state.drugs
	};
}

function mapDispatchToProps(dispatch){
	return {
		saveDrug: drug => dispatch(drugActions.saveDrug(drug)),
		errorActions: bindActionCreators({setErrors}, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Drugs);