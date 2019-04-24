import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import FooterNav from "./components/FooterNav";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SongMap from "./pages/SongMap";
import Me from "./pages/Me";
import Account from "./pages/Account";
import About from "./pages/About";
import TextPage from "./pages/TextPage";
import Search from "./pages/Search";
import Artist from "./pages/Artist";
import NoMatch from "./pages/NoMatch";

/* ADDED FOR TESTING */
import Library from "./pages/Library";
import BrowserPlayer from "./components/BrowserPlayer";

/* 	
	This component is funcitonal and has no state
	but it renders all the visible page content	
*/
const Routes = ({ userName, userAuthorized }) => (
  <div id="Routes">
    <Navbar userName={userName} />
    <div className="main-content">
      <Switch>
        {/* Main Content / Navbar Pages */}
        <Route exact path="/" component={Home} />
        <Route exact path="/home" render={() => <Redirect to="/" />} />
        {/* This simply redirects back to the Home page */}
        <Route exact path="/me" render={() => <Me userName={userName} />} />
        {/* Using the render prop we can pass props to the component rendered by the Route */}
        <Route
          exact
          path="/account"
          render={() => (
            <Account userName={userName} userAuthorized={userAuthorized} />
          )}
        />
        <Route
          exact
          path="/authorized"
          render={() => <Home userAuthorized={userAuthorized} />}
        />
        {/* These pages don't have the FooterNav */}
        <Route exact path="/map" component={SongMap} />
        <Route exact path="/login" component={Login} />
        {/* Pages that GETs Spotify data based on URL parameters */}
        <Route exact path="/search" component={Search} />
        <Route exact path="/search/:query" component={Search} />
        <Route exact path="/artist/:artist_id" component={Artist} />
        {/* The ':id' means the component will get passed a url parameter */}
        <Route exact path="/library" component={Library} />
        {/* Static Information pages */}
        <Route exact path="/about" component={About} />
        <Route
          exact
          path="/terms"
          render={() => <TextPage textFile="terms_and_conditions.txt" />}
        />
        <Route
          exact
          path="/privacy"
          render={() => <TextPage textFile="privacy_policy.txt" />}
        />
        {/* This is the 404 page */}
        <Route component={NoMatch} />
      </Switch>
    </div>
    {/* The regular expression matches all routes that are not exactly '/map' or '/login' */}
    {/* This throws an error, but it's just because react router didn't use to support regex */}
    <Route path={/^(?!(\/map|\/login)$).*$/} component={FooterNav} />

    <BrowserPlayer userName={userName} />
  </div>
);

export default Routes;
