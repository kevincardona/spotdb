import React from 'react';
import { Link } from 'react-router-dom';
import '../layouts/Home.css';
import logo from '../assets/logo.svg';
import {apiPost, apiGet} from '../util/api';
const queryString = require('query-string');

class Home extends React.Component {
	// Home will use state to hold tweet info

	state = {
		artists: []
	};

	retrieveArtists = () => {
		apiGet('/getTweetInfo').then((data) => {
			console.log(data);
				this.setState({
					artists: data.map((item) => {
						return item
					})
				})
				console.log(this.state);
		}).catch((error) => {
			console.log(error);
		})
	}

	//Authorization Stuff
	componentDidMount() {

		this.retrieveArtists();

		const parsed = queryString.parse(window.location.search);

				//If a user is logging in
				if (parsed.code) {
					const body = {
						code: parsed.code
					}

					apiPost('/authorized', body).then((data) => {
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
    }

	render() {
		const { artists } = this.state;

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
					{/* This map function returns for every element in an array so you can show dynamic data */}
						{artists.map((item) => (
							<div key={item.name}>
								<div className="Home-artist-title">{item.name}</div>
								<div className="Home-spotdb-tweets">
									<div className="Home-tweet-list">
										<div className="Home-tweet">
											Artist Twitter Score: {item.qualityScore}
										</div>
									</div>
									<div className="Home-tweet-right-column">
										<img src={logo} alt="SpotDB Logo" className="Home-spotdb-logo" />
										<span className="Home-tweeter">@spotdb</span>
									</div>
								</div>
							</div>
						))}
					</div>
		);
	}
}

export default Home;
