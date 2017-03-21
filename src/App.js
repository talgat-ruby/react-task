import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Login from './login/Login';
import Main from './main/Main';

class App extends Component {
	state = {
		user: ''
	}

	setUser = user => {
		console.log('user', user);
		this.setState({ user });
	}

	render = () => (
		<div className="app">
			{!this.state.user && <Redirect to="/login"/>}
			<Switch>
				<Route exact path="/login" render={() => (
					<Login setUser={this.setUser}/>
				)}/>
				<Route exact path="/main" component={Main}/>
			</Switch>
		</div>
	)
}

/*
<Switch>
				<Route exact path="/" render={() => <Redirect to="/login"/>}/>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/main" component={Main}/>
			</Switch>
*/

export default App;
