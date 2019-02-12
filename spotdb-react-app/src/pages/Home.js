import React from 'react';
import { Link } from 'react-router-dom';
import '../layouts/Home.css';
import FooterNav from '../components/FooterNav';
import logo from '../assets/logo.svg';

class Home extends React.Component {
    render() {
        return (
        		<div className="main-content">
	            <div className="Home">
	                <div className="Home-learn-more">
                        <span><b>What</b> is SpotDB?</span>
                        <Link to="/about">Learn More</Link>
                    </div>
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
            	<FooterNav />
            </div>
        );
    }
}

export default Home;