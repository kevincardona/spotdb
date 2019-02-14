import React from 'react';
import { Link } from 'react-router-dom';
import '../layouts/Search.css';
import spotify_logo from '../assets/Spotify_Icon_RGB_Green.png';

class Search extends React.Component {
	state = {
		params: this.props.location.search,
		// This is the array of results we get from the Spotify API
		results : [{id: 0, title: "Artist A", info: "Something"}, {id: 1, title: "Artist B", info: "Something"}, {id: 2, title: "Artist C", info: "Something"}, {id: 3, title: "Artist D", info: "Something"}],
	};

	/*
		When you search on the search page, we need this function to get the new search
		Since react technically doesn't refresh when the url changes
	*/
	static getDerivedStateFromProps(nextProps, prevState) {
		// you return the update to the state after this function is called
		return {
			params: nextProps.location.search,
		};
	}

	render() {
		// This is a JavaScript built in to '.get()' url querys
		const urlParams = new URLSearchParams(this.state.params);
		return (
			<div className="Search">
				<h1>This will process query parameters</h1>
				<h2>query = "{urlParams.get("query")}"</h2>
				<ul className="Search-list">
					{/* This map function returns for every element in an array so you can show dynamic data */}
					{this.state.results.map((item,i) => (
							<li key={item.id} className="Search-item">
								<img src={spotify_logo} alt="Album artwork" className="Search-album-art" />
								<Link to={"/artist/" + item.title} ><span>{item.title}</span></Link>
								<i>{item.info}</i>
							</li>
						))}
				</ul>
			</div>
		);
	}
}

export default Search;