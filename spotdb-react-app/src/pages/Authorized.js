import React,{ Component } from 'react';
import '../layouts/Home.css';
import { Script } from 'vm';

class Authorized extends Component {

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
        //console.log(this.props.location.search)
        var apiKey = this.props.location.search
        var callbackUri = 'http://localhost:5000/authorized' + apiKey
        window.location = callbackUri
        return (
          <div className="App">
            <header className="App-header">
            <h1>Authorized</h1>
            {}
            </header>
          </div>
        );
      }
}

export default Authorized;