import React, { PureComponent } from 'react';
import { Input, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './Login.css';

import LoginModal from './LoginModal';

const validData = {
	password: 'password'
};

class Login extends PureComponent {
	initState = {
		success: false,
		openModal: false,
		user: '',
		password: ''
	}

	state = this.initState

	closeModal = () => {
		this.setState(this.initState);
	}

	validate = () => (
		this.state.password === validData.password
	)

	submitHandler = event => {
		event.preventDefault();
		if(this.validate()) {
			this.setState({ success: true });
			this.props.setUser(this.state.user);
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
			<Redirect to="/main"/>
		) :	(
			<div className="login">
				<h2>Log In Your Account</h2>
				<form onSubmit={this.submitHandler}>
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
				<LoginModal open={this.state.openModal} closeModal={this.closeModal}/>
			</div>
		)
	)
}

export default Login;
