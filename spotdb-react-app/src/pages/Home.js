import React from 'react';
import { Link } from 'react-router-dom';
import '../layouts/Home.css';
import logo from '../assets/logo.svg';
import {apiPost, apiGet} from '../util/api';
const queryString = require('query-string');

class Home extends React.Component {
	// Home will use state to hold tweet info
	state = {}

	//Authorization Stuff
	componentDidMount() {
				const parsed = queryString.parse(window.location.search);

				//If a user is logging in
				if (parsed.code) {
					const body = {
						code: parsed.code
					}

					apiPost('/authorized', body).then((data) => {
						console.log(data);
						if(data.success && data.token && data.display_name && data.id) {
							localStorage.setItem('token', data.token);
							this.props.userAuthorized(data.display_name, data.id);
						} else {
							this.props.userAuthorized("");
						}
					}).catch((error) => {
						console.log(error);
					}).then(() => {
					})
				}

				apiGet('/getTweets').then((data) => {
					console.log(data);
				}).catch((error) => {
					console.log(error);
				})
    }

	render() {
		return (
				<div className="Home">

					{/* /About Link */}
					<div className="Home-learn-more">
						<span><b>What</b> is SpotDB?</span>
						<Link to="/about">Learn More</Link>
					</div>


					{/* This is the Personal twitter feed */}
					<div className="Home-spotdb-tweets" style={{marginTop: '24px',}}>
						<div className="Home-tweet-list">
							<div className="Home-tweet">
								Hey Guys! Welcome to the launch of SpotDB. We'll be getting you some pretty dope data soon! Check us out. #spotdb #keepingitreal
							</div>
						</div>
						<div className="Home-tweet-right-column">
							<img src={logo} alt="SpotDB Logo" className="Home-spotdb-logo" />
							<span className="Home-tweeter">@spotdb</span>
						</div>
					</div>


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
		);
	}
}

export default Home;
