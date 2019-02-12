import React from 'react';
import '../layouts/Me.css';
import PopupBanner from '../components/PopupBanner';
import logo from '../assets/logo.svg';

class Me extends React.Component {
	state = {
		name: this.props.userName || "John Smith",	// Gets userName passed from App.js, or use 'John Smith' if not logged in
		birthday: "6/24/97",
		follower_count: 1,
		following_count: 41,
	}

	render() {
		const { name } = this.state;

		return (
			<div>

				{/* This is the banner that notifies when not logged in */}
				{!this.props.userName && <PopupBanner text="Please log in to get personalized results! You are only seeing an example page." />}
				
				<div className="Me">
					
					<div className="Me-hero">These are {name}'s Favorite Artists!</div>

					{/* This is the template for the Tweet info */}
					<div>
					<div className="Home-artist-title">Lady Gaga</div>
					<div className="Home-spotdb-tweets">
					<div className="Home-tweet-list">
					<div className="Home-tweet">
					Wow! #spotdb #goinggaga
					</div>
					</div>
					<div className="Home-tweet-right-column">
					<img src={logo} alt="SpotDB Logo" className="Home-spotdb-logo" />
					<span className="Home-tweeter">@spotdb</span>
					</div>
					</div>
					</div>
					<div>
					<div className="Home-artist-title">Bruno Mars</div>
					<div className="Home-spotdb-tweets">
					<div className="Home-tweet-list">
					<div className="Home-tweet">
					24 Carrots made of Gold? #spotdb #pun-a-licious
					</div>
					</div>
					<div className="Home-tweet-right-column">
					<img src={logo} alt="SpotDB Logo" className="Home-spotdb-logo" />
					<span className="Home-tweeter">@spotdb</span>
					</div>
					</div>
					</div>


				</div>
			</div>
		);
	}
}

export default Me;