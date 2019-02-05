import React from 'react';
import '../layouts/Navbar.css';
import logo from '../assets/logo.svg';

class Navbar extends React.Component {
	state = {
		searchQuery: "",
		queryError: "",
	};

	validateQuery = (query) => {
		const regex = /.*/;
		return !regex.test(query) ? "Search Query Invalid" : "";
	};

	onQueryBlur = () => {
		const { searchQuery } = this.state;
		const queryError = this.validateQuery( searchQuery );
		return this.setState({ queryError });
	};

	onQueryChange = event => {
		this.setState({
			searchQuery: event.target.value
		});
	};

	render() {
		return (
			<div className="Navbar">
				<a href="/">
					<img src={logo} alt="SpotDB logo of cardinal singing." className="Navbar-logo"  />
					<span className="Navbar-title">SpotDB</span>
				</a>
				<a href="/Home">
					Home
				</a>
				<a href="">
					Personalization 
				</a>
				<a href="/Map">
					Song Map
				</a>
				<div>
					<input 	type="text" placeholder="Search" className="Navbar-search" 
									onChange={this.onQueryChange} 
									onBlur={this.onQueryBlur} />
				</div>
				<div>
					<a href="/Login" className="Navbar-login">Login</a>
				</div>
			</div>
		);
	}
}

export default Navbar;