import React from 'react';
import '../layouts/NoMatch.css';
import Navbar from '../components/Navbar';

class NoMatch extends React.Component {
    render() {
        return (
            <div>
            		<Navbar />
                <h1>404!</h1>
            </div>
        );
    }
}

export default NoMatch;