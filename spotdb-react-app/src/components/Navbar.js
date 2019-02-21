import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import '../layouts/Navbar.css';
import logo from '../assets/logo.svg';

class Navbar extends React.Component {
	state = {
		searchQuery: "",
		queryError: "",
		mobileMenuVisible: false,
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
		this.props.history.push({pathname: '/search', search: '?query=' + this.state.searchQuery});
		window.location.reload()
	};

	onMobileMenuClick = () => {
		this.setState({
			mobileMenuVisible: !this.state.mobileMenuVisible
		});
	};

	render() {
		const {mobileMenuVisible} = this.state;

		return (
			<div className={"Navbar" + (mobileMenuVisible ? "" : " Navbar-minimized")}>
				<div className="Navbar-primary">
					<Link to="/">
						<img src={logo} alt="SpotDB logo of cardinal singing." className="Navbar-logo"  />
						<span className="Navbar-title">SpotDB</span>
					</Link>
					<span onClick={this.onMobileMenuClick} className="Navbar-mobile-menu">&#9776;</span>
				</div>
				<NavLink exact to="/" activeClassName="Navbar-active" className={mobileMenuVisible ? "" : "hidden"}>
					Home
				</NavLink>
				<NavLink to="/me" activeClassName="Navbar-active" className={mobileMenuVisible ? "" : "hidden"}>
					Personalization 
				</NavLink>
				<NavLink to="/map" activeClassName="Navbar-active" className={mobileMenuVisible ? "" : "hidden"}>
					Song Map
				</NavLink>
				<div className={mobileMenuVisible ? "" : "hidden"}>
					<input 	type="text" placeholder="Search" className="Navbar-search" 
									onChange={this.onQueryChange} 
									onBlur={this.onQueryBlur}
									onKeyDown={this.onQueryKeyDown} />
				</div>
				<div className={mobileMenuVisible ? "Navbar-last " : "Navbar-last hidden"}>
					{this.props.userName
						? <Link to="/account" className="Navbar-login Navbar-account">Account</Link>
						: <Link to="/login" className="Navbar-login">Login</Link>
					}
				</div>
			</div>
		);
	}
}

export default withRouter(Navbar);
