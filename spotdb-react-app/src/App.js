import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider, withCookies } from "react-cookie";
import { apiGet } from "./util/api";
import Routes from "./Routes";
import "./layouts/App.css";

class App extends Component {
  /* We pass state information down through props to the components that need it
   * Using functions (see userAuthorized) passed down through props
   * to change the the state when needed.
   */

  // This is the global state that will be shared throughout the app.
  state = {
    userName: ""
  };

  componentWillMount() {
    apiGet(`/authenticate`)
      .then(data => {
        if (data.success) {
          apiGet("/accountinfo")
            .then(data => {
              this.setState({
                userName: data.user.display_name
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // This takes the name of the logged in user. "" <- empty string means nobody logged in.
  userAuthorized = value => {
    this.setState({
      userName: value
    });
  };

  render() {
    return (
      <CookiesProvider>
        <BrowserRouter>
          {/* Passing global state info and function references to the rest of the app */}
          <Routes
            userName={this.state.userName}
            userAuthorized={this.userAuthorized}
          />
        </BrowserRouter>
      </CookiesProvider>
    );
  }
}

export default withCookies(App); // The withCookies() lets us use this.props.cookies that stores info in the browser
