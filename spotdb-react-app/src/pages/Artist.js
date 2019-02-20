import React from 'react';
import '../layouts/Artist.css';
import PopupBanner from '../components/PopupBanner';
import { apiGet } from '../util/api';

class Artist extends React.Component {
	/*
		This has the the artist data we get from Spotify
		We get the id to search is by from the url from "props.match.params.id"
		(The params name is defined in Routes.js)
	*/
	state = {
		artist : {
			id: this.props.match.params.id || "",
			name: "",
			popularity: 0,
		},
	}

	componentDidMount() {
		const urlParams = new URLSearchParams(window.location.search);
		var artistId = urlParams.get("id")
		//console.log(artistId)
		apiGet('/artist?query='+artistId).then((data) => {
			this.setState({artist: {name: data.name, popularity: data.popularity}})
		}).catch((err) => {
			console.log(err);
		})
	}

	render() {
		const { artist } = this.state;

		return (
			<div>
				{/* This banner should only show if you go to '/artist' */}
				{ !artist.id && <PopupBanner text="No artist is selected." /> }
				<div className="Artist">
					<h1>Artist page for {artist.id}</h1>
				</div>
			</div>
		);
	}
}

export default Artist;