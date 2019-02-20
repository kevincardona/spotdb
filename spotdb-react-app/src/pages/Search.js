import React from 'react';
import { Link } from 'react-router-dom';
import '../layouts/Search.css';
import spotify_logo from '../assets/Spotify_Icon_RGB_Green.png';
import { apiGet } from '../util/api';

class Search extends React.Component {
	state = {
		params: this.props.location.search,
		// This is the array of results we get from the Spotify API
		results : [],
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

	componentDidMount() {
		const urlParams = new URLSearchParams(window.location.search);
		apiGet('/search?query='+urlParams.get("query")).then((data) => {
			console.log(data)
			const a = this.state.results.slice();
			var i;
			for (i = 0; i < 4; i++) {
				if (data.user.items[i] == null) {
					break;
				}
				var id;
				if (data.user.items[i].id == null) {
					id = 0;
				} else {
					id = data.user.items[i].id
				}
				var name;
				if (data.user.items[i].name == null) {
					name = "None"
				} else {
					name = data.user.items[i].name
				}
				var pop;
				if (data.user.items[i].popularity == null) {
					pop = 0;
				} else {
					pop = data.user.items[i].popularity
				}
				var artImg;
				if (data.user.items[i].images[0] == null) {
					artImg = spotify_logo
				} else {
					artImg = data.user.items[i].images[0].url
				}
				
				a[i] = {id: id, title: name, info: "Popularity: "+ pop, img: artImg};
			}
			this.setState({results: a});
			this.forceUpdate();
		}).catch((err) => {
			console.log(err);
		})
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
								<img src={item.img} alt="Album artwork" className="Search-album-art" />
								<Link to={"/artist/" + item.title + "?id=" + item.id} ><span>{item.title}</span></Link>
								<i>{item.info}</i>
							</li>
						))}
				</ul>
			</div>
		);
	}
}

export default Search;