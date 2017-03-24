import React, { PropTypes } from 'react';
import './Header.css';

const Header = ({ user, redditName }) => {
	return (
		<header className="main-header">
			<span className="reddit-name">{redditName}</span>
			<span className="user">{user}</span>
		</header>
	);
};

Header.propTypes = {
	user: PropTypes.string.isRequired,
	redditName: PropTypes.string.isRequired
};

export default Header;
