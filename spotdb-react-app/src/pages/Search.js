import React from 'react';
import { Link } from 'react-router-dom';
import '../layouts/Search.css';
import FooterNav from '../components/FooterNav';
import spotify_logo from '../assets/Spotify_Icon_RGB_Green.png';

class Search extends React.Component {
	state = {
		params: this.props.location.search,
		results : [{id: 0, title: "Artist A", info: "Something"}, {id: 1, title: "Artist B", info: "Something"}, {id: 2, title: "Artist C", info: "Something"}, {id: 3, title: "Artist D", info: "Something"}],
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			params: nextProps.location.search,
		};
	}

	render() {
		const urlParams = new URLSearchParams(this.state.params);
		return (
			<div className="main-content">
				<div className="Search">
					<h1>This will process query parameters</h1>
					<h2>query = "{urlParams.get("query")}"</h2>
					<ul className="Search-list">
						{this.state.results.map((item,i) => (
								<li key={item.id} className="Search-item">
									<img src={spotify_logo} alt="Album artwork" className="Search-album-art" />
									<Link to={"/artist/" + item.title} ><span>{item.title}</span></Link>
									<i>{item.info}</i>
								</li>
							))}
					</ul>
				</div>
				<FooterNav />
			</div>
		);
	}
}

export default Search;