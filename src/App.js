import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import { DEFAULT_REDDIT } from './environment';

import Login from './login/Login';
import View from './view/View';

class App extends Component {
	state = {
		user: '',
		reddit: ''
	}

	setAppState = state => this.setState(state)

	render = () => (
		<div className="app">
			<Switch>
				<Route exact path="/login" render={() => (
					<Login setAppState={this.setAppState}/>
				)}/>
				<Route exact path="/reddit/:redditName" render={
					({ match: { params: { redditName } } }) => (
						!this.state.user ?
						<Redirect push to="/login"/>
						: <View user={this.state.user} redditName={redditName}/>
					)
				}/>
				<Redirect push to={`/reddit/${this.state.reddit || DEFAULT_REDDIT}`}/>
			</Switch>
		</div>
	)
}

export default App;
