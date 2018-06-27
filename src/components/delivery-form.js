import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from './input';
import {required, nonEmpty, email, fiveCharacters, isANumber} from '../validators';

export class DeliveryForm extends React.Component {
	onSubmit(values) {
		return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (res.ok) {

			}	
		})
	}

	render() {
		let successMessage;
		if (this.props.submitSucceeded) {
			successMessage = (<div className="message message-success">Message submitted successfully</div>);
		};

		return (
			<form
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
					)}>
				<label htmlFor="trackingNumber">Tracking Number</label>
				<Field 
					name="trackingNumber" 
					id="trackingNumber" 
					type="text" 
					component={Input} 
					validate={[required, fiveCharacters, isANumber, nonEmpty]}
				/>
				<label htmlFor="issue">What is your issue?</label>
				<Field 
					name="issue" 
					id="issue" 
					element="select"
					component={Input}
					validate={[required, nonEmpty]}>
					<option value="not-delivered">My delivery hasn't arrived</option>
					<option value="wrong-item">The wrong item has arrived</option>
					<option value="damaged">Some of my order was damage</option>
					<option value="missing-part">Part of my order was missing</option>
					<option value="other">Other - Let us know below</option>
				</Field>
				<label htmlFor="details">Give more details (optional)</label>
				<Field 
					name="details" 
					id="details" 
					element="textarea"
					component={Input} 
					validate={[]}
				/>
				<button 
					type="submit"
					disabled={this.props.pristine || this.props.submitting}
					>Submit</button>
				{successMessage}
			</form>
		);
	}
}

export default reduxForm({
	form: 'delivery',
	initialValues: {issue: 'arrived'}
})(DeliveryForm);