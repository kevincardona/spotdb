import React from 'react';
import '../layouts/Artist.css';
import PopupBanner from '../components/PopupBanner';
import FooterNav from '../components/FooterNav';

class Artist extends React.Component {
	state = {
		artist : {
			id: this.props.match.params.id || "",
		},
	}

	render() {
		const { artist } = this.state;

		return (
			<div className="main-content">
				<div className="Artist">
					{ !artist.id && <PopupBanner text="No artist is selected." /> }
					<h1>Artist page for {artist.id}</h1>
				</div>
				<FooterNav />
			</div>
		);
	}
}

export default Artist;