import React, { PropTypes } from 'react';
import './List.css';

import like from '../../media/thumbs-up.svg';
import dislike from '../../media/thumb-down.svg';

const List = ({ list, states }) => {
	const renderList = ({ id, image, state }) => (
		<article key={id}>
			<img src={image} alt=""/>
			{
				state === states.LIKE ?
				<img src={like} alt="like"/>
				: <img src={dislike} alt="dislike"/>
			}
		</article>
	);

	return (
		<div className="list">
			{list.map(renderList)}
		</div>
	);
};

List.propTypes = {
	list: PropTypes.array,
	states: PropTypes.objectOf(PropTypes.string.isRequired)
};

export default List;
