import React from 'react';
import '../layouts/Account.css';
import profilePicture from "../assets/logo.svg";

class Account extends React.Component {
	// Using state to store data passed to it form props
	state = {
		name: this.props.userName || "No Name",
		birthday: "6/24/97",
		follower_count: 1,
		following_count: 41,
	}

	/*
		The logout button called the function passed to it from the App.js
		and it tells it to update the state. Sets userName to "".
	*/
	onLogoutClick = () => {
		this.props.userAuthorized("");
	};

	render() {
		if (this.props.userName) {
			// Render this is logged in
			// All we need to do is update state to change data that is displayed
			return (
				<div className="Account">
						<img src={profilePicture} alt="Your Spotify Profile" className="Account-profile-pic" />
						<div className="Account-name">{this.state.name}'s Profile</div>
						<p>🗓 {this.state.birthday}</p>
						<p>Followers: {this.state.follower_count} <br />
							Following: {this.state.following_count}</p>
						<input type="button" value="Logout" onClick={this.onLogoutClick} />
				</div>
			);
		} 
		else {
			// Renders this if not logged in
			return (
				<div className="Account">
					<h1>You are not logged in.</h1>
				</div>
			);
		}
	}
}

export default Account;