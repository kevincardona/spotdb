import React from 'react';
import { Link } from 'react-router-dom';
import '../layouts/Home.css';
import logo from '../assets/logo.svg';
import TwitterTimeline from '../components/TwitterTimeline';
import TwitterTweet from '../components/TwitterTweet';

class Home extends React.Component {
	// Home will use state to hold tweet info
	state = {}

	render() {
		return (
				<div className="Home">

					{/* /About Link */}
					<div className="Home-learn-more">
						<span><b>What</b> is SpotDB?</span>
						<Link to="/about">Learn More</Link>
					</div>

					{/* This is the Personal twitter feed */}

					<div style={{marginTop: "32px"}}>
						<TwitterTimeline user="spotdb" />
					</div>

					{/* This is the template for the Tweet info */}
					<div>
						<div className="Home-artist-title">Lady Gaga</div>
						<div className="Home-spotdb-tweets">
							<iframe src="https://open.spotify.com/follow/1/?uri=spotify:artist:1HY2Jd0NmPuamShAr6KMms&size=detail&theme=dark" width="300" height="56" scrolling="no" frameborder="0" style={{border:"none", overflow:"hidden", allowtransparency:"true"}}></iframe>
							<TwitterTimeline user="ladygaga" />
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