import React from 'react';
import Navbar from '../components/Navbar';

class Login extends React.Component {
	// constructor() {
	// 	super();
	// }
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
				<Navbar />
				<div className="App">
					<div className="App-header">
						<a href='http://localhost:5000/login'> Login to Spotify </a>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;