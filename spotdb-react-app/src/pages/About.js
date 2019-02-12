import React from 'react';
import '../layouts/About.css';
import FooterNav from '../components/FooterNav';

class About extends React.Component {
    render() {
        return (
            <div className="main-content">
                <div className="About">
                	<h1>About Page</h1>
                </div>
                <FooterNav />
            </div>
        );
    }
}

export default About;