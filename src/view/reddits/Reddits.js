import React, { PropTypes } from 'react';
import $class from 'classnames';
import './Reddits.css';

import like from '../../media/thumbs-up.svg';
import dislike from '../../media/thumb-down.svg';

const Reddits = ({ reddits, vote, states }) => {
	const renderReddit = ({ id, image, title, author, state }, index) => {
		console.log(image);
		return (
			<article key={id}>
				<figure>
					<img src={image} alt="reddit"/>
					<div className="vote">
						<i 
							className={$class({ active: state === states.LIKE })} 
							onClick={() => vote(index, states.LIKE)}>
							<img src={like} alt="like"/>
						</i>
						<i 
							className={$class({ active: state === states.DISLIKE })}
							onClick={() => vote(index, states.DISLIKE)}>
							<img src={dislike} alt="dislike"/>
						</i>
					</div>
				</figure>
				<div className="content">
					<h5>{title}</h5>
					<p>Submitted by {author}</p>
				</div>
			</article>
		);
	}

	return (
		<div className="reddits">
			{reddits.map(renderReddit)}
		</div>
	);
};

Reddits.propTypes = {
	reddits: PropTypes.array,
	vote: PropTypes.func.isRequired,
	states: PropTypes.objectOf(PropTypes.string.isRequired)
}

export default Reddits;
