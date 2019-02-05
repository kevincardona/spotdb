import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
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

	onQueryChange = (event) => {
		this.setState({
			searchQuery: event.target.value
		});
	};

	onQueryKeyDown = (event) => {
		if (event.key === "Enter") {
      this.onQuerySubmit();
    }
	};

	onQuerySubmit = () => {
		this.props.history.push('/search?query=' + this.state.searchQuery);
	};

	render() {
		return (
			<div className="Navbar">
				<Link to="/">
					<img src={logo} alt="SpotDB logo of cardinal singing." className="Navbar-logo"  />
					<span className="Navbar-title">SpotDB</span>
				</Link>
				<NavLink exact to="/" activeClassName="Navbar-active">
					Home
				</NavLink>
				<NavLink to="/me" activeClassName="Navbar-active">
					Personalization 
				</NavLink>
				<NavLink to="/map" activeClassName="Navbar-active">
					Song Map
				</NavLink>
				<div>
					<input 	type="text" placeholder="Search" className="Navbar-search" 
									onChange={this.onQueryChange} 
									onBlur={this.onQueryBlur}
									onKeyDown={this.onQueryKeyDown} />
				</div>
				<div>
					<Link to="/login" className="Navbar-login">Login</Link>
				</div>
			</div>
		);
	}
}

export default withRouter(Navbar);