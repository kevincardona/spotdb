import React from 'react';
import '../layouts/Login.css';
import spotifyLogo from '../assets/Spotify_Icon_RGB_Black.png';

class Login extends React.Component {
	// Unused?
	getHashParams() {
		var hashParams = {};
		var e, r = /([^&;=]+)=?([^&;]*)/g,
				q = window.location.hash.substring(1);
		e = r.exec(q)
		while (e) {
			 hashParams[e[1]] = decodeURIComponent(e[2]);
			 e = r.exec(q);
		}
		return hashParams;
	}

	render() {
		return (
			<div>
				<div className="Login">
					<a href='http://localhost:5000/login'> {/* We use 'a' here instead of 'Link' because it's an external link */}
						<div className="Login-button">
							<img src={spotifyLogo} alt="Spotify Logo" className="Login-button-logo" />
							<span className="Login-link">Login with your <br/> Spotify Account</span>
						</div>
					</a>
				</div>
			</div>
		);
	}
}

export default Login;
