import React, { PureComponent, PropTypes } from 'react';
import { Input, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './Login.css';

import { VALID_PASSWORD } from '../environment';

import ErrorModal from '../error-modal/ErrorModal';

class Login extends PureComponent {
	initState = {
		success: false,
		openModal: false,
		user: '',
		reddit: '',
		password: ''
	}

	state = this.initState

	closeModal = () => {
		this.setState(this.initState);
	}

	validate = () => (
		this.state.password === VALID_PASSWORD
	)

	submitHandler = event => {
		event.preventDefault();
		if(this.validate()) {
			this.setState({ success: true });
			this.props.setAppState({
				user: this.state.user,
				reddit: this.state.reddit
			});
		} else {
			this.setState({ openModal: true });
		}
	}

	changeHandler = (event, { name, value }) => {
		this.setState({
			[name]: value
		});
	}

	render = () => (
		this.state.success ? (
			<Redirect to="/"/>
		) :	(
			<div className="login">
				<h2>Log In Your Account</h2>
				<form onSubmit={this.submitHandler}>
					<Input 
						placeholder="Enter reddit name"
						size="large"
						name="reddit"
						value={this.state.reddit}
						onChange={this.changeHandler}/>
					<Input 
						placeholder="Enter username"
						size="large"
						name="user"
						value={this.state.user}
						onChange={this.changeHandler}/>
					<Input
						placeholder="Enter password"
						size="large"
						name="password"
						type="password"
						value={this.state.password}
						onChange={this.changeHandler}/>
					<Button color="green">
						Login
					</Button>
				</form>
				<ErrorModal 
					text="Please check you credentials"
					open={this.state.openModal}
					closeModal={this.closeModal}/>
			</div>
		)
	)
}

Login.propTypes = {
	setAppState: PropTypes.func.isRequired
};

export default Login;
