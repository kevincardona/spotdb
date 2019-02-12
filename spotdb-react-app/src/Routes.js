import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import SongMap from './pages/SongMap';
import Authorized from './pages/Authorized';
import Me from './pages/Me';
import Account from './pages/Account';
import About from './pages/About';
import TextPage from './pages/TextPage';
import Search from './pages/Search';
import Artist from './pages/Artist';
import NoMatch from './pages/NoMatch';

const Routes = ({userName, userAuthorized}) => (
	<div id="Routes">
		<Navbar userName={userName} />
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/home" render={() => (<Redirect to="/" />)} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/me" render={() => <Me userName={userName} />} />
			<Route exact path="/map" component={SongMap} />
			<Route exact path="/account" render={() => <Account userName={userName} userAuthorized={userAuthorized} />} />
			<Route exact path="/about" component={About} />
			<Route exact path="/terms" render={() => <TextPage textFile="terms_and_conditions.txt" />} />
			<Route exact path="/privacy" render={() => <TextPage textFile="privacy_policy.txt" />} />
			<Route exact path="/search" component={Search} />	
      <Route exact path="/authorized" render={() => <Authorized userAuthorized={userAuthorized} />} />
      <Route exact path="/artist" component={Artist} />
      <Route exact path="/artist/:id" component={Artist} />
			<Route component={NoMatch} />
		</Switch>
	</div>
);

export default Routes;
