import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SongMap from './pages/SongMap';
import Authorized from './pages/Authorized';

const Routes = () => (
    <div>
        <Route exact path="/" component={SongMap} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Map" component={SongMap} />
        <Route exact path="/Authorized" component={Authorized} />
    </div>
);

export default Routes;