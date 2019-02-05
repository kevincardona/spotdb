import React from 'react';
import '../layouts/Me.css';
import Navbar from '../components/Navbar';

class Me extends React.Component {
    render() {
        return (
            <div>
            		<Navbar />
                <h1>This is for Me!</h1>
            </div>
        );
    }
}

export default Me;