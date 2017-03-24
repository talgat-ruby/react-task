import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Main.css';

import { VOTE_STATES, TABS, URL } from '../environment';
import defaultThumbnail from '../media/picture.svg';

import { Menu, Loader } from 'semantic-ui-react';
import ErrorModal from '../error-modal/ErrorModal';
import Reddits from './reddits/Reddits';
import List from './list/List';

class Main extends Component {
	state = {
		activeTab: TABS[0],
		reddits: [],
		list: [],
		isLoaded: false,
		failed: false
	}

	handleTabClick = (e, { name }) => this.setState({ activeTab: name })

	closeModal = () => this.setState({ redirect: true })

	addItem = (list, item, state) => ([
		...list, 
		Object.assign({}, item, { state })
	])

	alterItemState = (list, ind, state) => ([
		...list.slice(0, ind),
		Object.assign({}, list[ind], { state }),
		...list.slice(ind + 1)
	])

	vote = (index, state) => {
		this.setState(({ reddits, list }) => {
			const selectedItem = reddits[index];
			const itemInd = list.findIndex(({ id }) => id === selectedItem.id);
			const newList = itemInd === -1 ? 
				this.addItem(list, selectedItem, state)
				: this.alterItemState(list, itemInd, state);
			return {
				reddits: [
					...reddits.slice(0, index),
					Object.assign({}, selectedItem, { state }),
					...reddits.slice(index + 1)
				],
				list: newList
			}
		});
	}

	componentDidMount = () => {
		axios.get(`${URL}${this.props.redditName}.json`)
		.then(({ data: { data: { children } } }) => {
			const reddits = children.map(({ 
				data: { id, thumbnail = defaultThumbnail, title, author }
			}) => {
				const image = thumbnail !== 'self' && thumbnail !== 'default' ?
						thumbnail : defaultThumbnail;
				return {
					id,
					image,
					title,
					author,
					state: null
				}
			});
			this.setState({ 
				reddits,
				isLoaded: true 
			});
		})
		.catch(() => {
			this.setState({ 
				failed: true,
				isLoaded: true
			});
		});
	}

	renderContent = activeTab => {
		switch (activeTab) {
			case TABS[0]:
				return <Reddits 
							reddits={this.state.reddits} 
							vote={this.vote}
							states={VOTE_STATES}/>;
			case TABS[1]:
				return <List 
							list={this.state.list}
							states={VOTE_STATES}/>;
			default:
				return null;
		}
	}

	render = () => (
		this.state.isLoaded ? (
			<main>
				{ this.state.redirect && <Redirect to="/login" /> }
				<ErrorModal 
					open={this.state.failed}
					text="Invalid reddit name, please type valid"
					closeModal={this.closeModal}/>
				<Menu attached='top' tabular>
					<Menu.Item 
						name={TABS[0]} 
						active={this.state.activeTab === TABS[0]} 
						onClick={this.handleTabClick} />
					<Menu.Item 
						name={TABS[1]} 
						active={this.state.activeTab === TABS[1]} 
						onClick={this.handleTabClick} />
				</Menu>
				<section className="content">
					{ this.renderContent(this.state.activeTab) }
				</section>
			</main>
		) : (
			<Loader active/>
		)
	)
}

Main.propTypes = {
	redditName: PropTypes.string.isRequired
};

export default Main;	
