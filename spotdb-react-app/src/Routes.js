import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SongMap from './pages/SongMap';

const Routes = () => (
    <div>
        <Route exact path="/" component={SongMap} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Map" component={SongMap} />
    </div>
);

export default Routes;