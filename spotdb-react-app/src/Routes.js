import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import SongMap from './pages/SongMap';
<<<<<<< HEAD
import Authorized from './pages/Authorized';

const Routes = () => (
    <div>
        <Route exact path="/" component={SongMap} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Map" component={SongMap} />
        <Route exact path="/Authorized" component={Authorized} />
    </div>
=======
import Me from './pages/Me';
import Account from './pages/Account';
import Search from './pages/Search';
import NoMatch from './pages/NoMatch';

const Routes = () => (
	<div id="Routes">
		<Navbar isLoggedIn="false" /> {/* This need to be updated to take in a proper value */}
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/home" render={() => (<Redirect to="/" />)} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/me" component={Me} />
			<Route exact path="/map" component={SongMap} />
			<Route exact path="/account" component={Account} />
			<Route exact path="/search" component={Search} />
			<Route path="*" component={NoMatch} />
		</Switch>
	</div>
>>>>>>> origin/master
);

export default Routes;