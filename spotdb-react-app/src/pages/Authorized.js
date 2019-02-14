import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../layouts/Home.css';
import { Script } from 'vm';

class Authorized extends Component {
    // This tells app user is logged in based on a userName variable
    // Calls a function passed to it by App.js to update our global state
    componentDidMount() {
        this.props.userAuthorized("this_is_a_super_long_username"); // Replace with username once we get it
    }
    //buttonClick(){
    //    console.log("came here")
    //    
    //}
     
    // getHashParams() {
    //     var hashParams = {};
    //     var e, r = /([^&;=]+)=?([^&;]*)/g,
    //         q = window.location.hash.substring(1);
    //     e = r.exec(q)
    //     while (e) {
    //        hashParams[e[1]] = decodeURIComponent(e[2]);
    //        e = r.exec(q);
    //     }
    //     console.log(hashParams)
    //     return hashParams;
    //   }

    render() {
        console.log(window.location)
        var apiKey = window.location.search
        var callbackUri = 'http://localhost:5000/authorized' + apiKey
        window.location = callbackUri
        // window.location.href = 'http://localhost:3000' // THIS IS REPLACED with the Redirect Component below
        return (
          <div>
            <h1>Authorized</h1>
            {/* This Redirect component will redirect after mounting and will use react-router which is faster than 'refreshing' to home */}
            <Redirect to="/" />
          </div>
        );
      }
}

export default Authorized;
