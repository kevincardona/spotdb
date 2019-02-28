import React from 'react';
import '../layouts/Account.css';
import profilePicture from "../assets/logo.svg";
import { apiGet } from '../util/api';

class Account extends React.Component {
	// Using state to store data passed to it form props
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

	onLogoutClick = () => {
		this.props.userAuthorized("", "");
	};

	render() {
		if (this.props.userName) {
			// Render this is logged in
			// All we need to do is update state to change data that is displayed
			const{profilePicture} = this.state;
			return (
				<div className="Account">
						<img src={profilePicture} alt="Your Spotify Profile" className="Account-profile-pic" />
						<div className="Account-name">{this.state.name}'s Profile</div>
						<p>🗓 {this.state.birthday}</p>
						<p>Followers: {this.state.follower_count} 
						<br />
						</p>
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