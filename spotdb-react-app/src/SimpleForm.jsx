import React from 'react';
import './SimpleForm.css'
import Greetings from './Greetings'
import FirstNameField from './FirstNameField';
import LastNameField from './LastNameField';

class SimpleForm extends React.Component {
	state = {
		firstName: "",
		lastName: "",
		firstNameError: "",
		lastNameError: "",
	};

	validateName = (name) => {
		const regex = /^[A-Za-z]{3,}$/;

		return !regex.test(name) ? "The name must contain 3 letters. Numbers and special characters are not allowed." : "";
	};

	onFirstNameBlur = () => {
		const { firstName } = this.state;
		const firstNameError = this.validateName( firstName );
		return this.setState({ firstNameError });
	};

	onLastNameBlur = () => {
		const { lastName } = this.state;
		const lastNameError = this.validateName( lastName );
		return this.setState({ lastNameError });
	};

	onFirstNameChange = event => {
		this.setState({
			firstName: event.target.value
		});
	};
	
	onLastNameChange = event => {
		this.setState({
			lastName: event.target.value
		});
	};

	render() {
		const { firstName, firstNameError, lastName, lastNameError } = this.state;

		return (
			<div className="SimpleForm">
				<FirstNameField onChange={this.onFirstNameChange}
												onBlur={this.onFirstNameBlur}
												error={firstNameError} />

				<LastNameField onChange={this.onLastNameChange}
												onBlur={this.onLastNameBlur}
												error={lastNameError} />

				{/*<div>
					<label className="form">Name:
						<input type="text" name="firstName" onChange={this.onFirstNameChanged} onBlur={this.onFirstNameBlur} placeholder="First" autoCapitalize="words" />
						<input type="text" name="lastName" onChange={this.onLastNameChanged} onBlur={this.onLastNameBlur} placeholder="Last" autoCapitalize="words" />
					</label>
				</div>
				{(firstNameError && <div className="error">{firstNameError}</div>) || (lastNameError && <div className="error">{lastNameError}</div>)}*/}

				<Greetings firstName={firstName} lastName={lastName} />
			</div>
		);
	}

}

export default SimpleForm;