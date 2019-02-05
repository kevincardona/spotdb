import React,{ Component } from 'react';
import Map from '../components/Map';
import '../layouts/Home.css';
import Navbar from '../components/Navbar';

class Home extends Component {
    render() {
        return (
            <div>
            		<Navbar />
                <h1>Welcome to SpotDB</h1>
            </div>
        );
    }
}

export default Home;