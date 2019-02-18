import React from 'react';
import '../layouts/Me.css';
import PopupBanner from '../components/PopupBanner';
import logo from '../assets/logo.svg';
import TwitterTweet from '../components/TwitterTweet';

class Me extends React.Component {
	state = {
		name: this.props.userName || "John Smith",	// Gets userName passed from App.js, or use 'John Smith' if not logged in
		birthday: "6/24/97",
		follower_count: 1,
		following_count: 41,
		tweets: [
			{
				text: "This Cardi B/Bruno Mars Please Me is a whoooole mood 😩.",
				picture: "",
				name: "Honey 🌺🌸",
				user: "mimiJai__",
				date: "February 16, 2019",
				url: "https://twitter.com/mimiJai__/status/1096798069029511168"
			},
		],
	}

	render() {
		const { name, tweets } = this.state;

		return (
			<div>

				{/* This is the banner that notifies when not logged in */}
				{!this.props.userName && <PopupBanner text="Please log in to get personalized results! You are only seeing an example page." />}
				
				<div className="Me">
					
					<div className="Me-hero">These are {name}'s Favorite Artists!</div>

					{/* This is the template for the Tweet info */}
					<div>
						<div className="Home-artist-title">Bruno Mars</div>
						<div className="Home-spotdb-tweets">
							{tweets.map((item) => (
								<TwitterTweet text={item.text} picture={item.picture} name={item.name} user={item.user} date={item.date} url={item.url} />
							))}
							<iframe src="https://open.spotify.com/embed/track/3Vo4wInECJQuz9BIBMOu8i" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>						</div>
					</div>


				</div>
			</div>
		);
	}
}

export default Me;