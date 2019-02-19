import React from 'react';
import '../layouts/Me.css';
import PopupBanner from '../components/PopupBanner';
import logo from '../assets/logo.svg';
import { apiGet } from '../util/api';


class Me extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profilePicture: "",
			name: this.props.userName || "No Name",
			birthday: "",
			follower_count: "",
			following_count: "",
		};
	}

	componentDidMount() {
		apiGet('/accountinfo').then((data) => {
			this.setState({follower_count: data.user.followers.total,
			profilePicture: data.user.images[0].url, birthday: data.user.birthdate})
		}).catch((err) => {
			console.log(err);
		})
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