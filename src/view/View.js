import React, { PropTypes } from 'react';
import './View.css';

import Header from './Header';
import Main from './Main';

const View = ({ user, redditName }) => {
	return (
		<div className="view">
			<Header user={user} redditName={redditName}/>
			<Main redditName={redditName}/>
		</div>
	)
};

View.propTypes = {
	user: PropTypes.string.isRequired,
	redditName: PropTypes.string.isRequired
};

export default View;
