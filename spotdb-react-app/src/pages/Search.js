import React from 'react';
import { Link } from 'react-router-dom';
import '../layouts/Search.css';
import spotify_logo from '../assets/Spotify_Icon_RGB_Green.png';
import { apiGet } from '../util/api';
import PopupBanner from '../components/PopupBanner';

class Search extends React.Component {
	state = {
		query: this.props.match.params.query || "",
		prevApiQuery: "",
		// This is the array of results we get from the Spotify API
		results : [],
		error: false
	};

	searchSpotify = (query) => {
		apiGet('/search?query=' + query).then((data) => {
			if (data.success) {
				this.setState({
					prevApiQuery: query,
					results: data.user.items,
					error: false
				})
			}
			else {
				this.setState({
					error: true,
					prevApiQuery: query,
					results: data.user.items
				})
			}
		})
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			query: nextProps.match.params.query || "",
		};
	}

	render() {
		const { query, prevApiQuery, results, error } = this.state;

		if (query !== prevApiQuery) {
			this.searchSpotify(query)
		}

		return (
			<div>
				{ error && <PopupBanner text="There was an error, try logging in again." /> }
				<div className="Search">
					<h1>This will process query parameters</h1>
					<h2>query = "{query}"</h2>
					<ul className="Search-list">
						{/* This map function returns for every element in an array so you can show dynamic data */}
						{results.map((item) => (
								<li key={item.id} className="Search-item">
									<img src={item.images.length > 0 ? item.images[0].url : ""} alt="Artist profile" className="Search-album-art" />
									<Link to={"/artist/" + item.id} ><span>{item.name}</span></Link>
									<i>{item.popularity}</i>
								</li>
							))}
					</ul>
				</div>
			</div>
		);
	}
}

export default Search;