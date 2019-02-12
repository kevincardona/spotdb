import React from 'react';
import '../layouts/Account.css';
import profilePicture from "../assets/logo.svg";
import FooterNav from '../components/FooterNav';

class Account extends React.Component {
	state = {
		name: this.props.userName || "No Name",
		birthday: "6/24/97",
		follower_count: 1,
		following_count: 41,
	}

	onLogoutClick = () => {
		this.props.userAuthorized("");
	};

	render() {
		if (this.props.userName) {
			return (
				<div className="main-content">
					<div className="Account">
							<img src={profilePicture} alt="Your Spotify Profile" className="Account-profile-pic" />
							<div className="Account-name">{this.state.name}'s Profile</div>
							<p>🗓 {this.state.birthday}</p>
							<p>Followers: {this.state.follower_count} <br />
								Following: {this.state.following_count}</p>
							<input type="button" value="Logout" onClick={this.onLogoutClick} />
					</div>
					<FooterNav />
				</div>
			);
		} 
		else {
			return (
				<div className="main-content">
					<h1>You are not logged in.</h1>
					<FooterNav />
				</div>
			);
		}
	}
}

export default Account;