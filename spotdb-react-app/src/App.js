import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider, withCookies } from 'react-cookie';
import Routes from './Routes';
import './layouts/App.css';

class App extends Component {
	state = {
		userName: this.props.cookies.get('userName') || "",
	}

	userAuthorized = (value) => {
		this.setState({
			userName: value
		});
		this.props.cookies.set('userName', value);
	}

  render() {
    return (
    		<CookiesProvider>
		      <BrowserRouter>
		        <Routes userName={this.state.userName} userAuthorized={this.userAuthorized} />
		      </BrowserRouter>
      	</CookiesProvider>
    );
  }
}

export default withCookies(App);
