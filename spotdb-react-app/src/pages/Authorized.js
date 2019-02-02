import React,{ Component } from 'react';
import '../layouts/Home.css';
import { Script } from 'vm';

class Authorized extends Component {
    render() {
        return (
          <div className="App">
            <header className="App-header">
              <a href='http://localhost:5000/authorized'> Authorized </a>
            </header>
          </div>
        );
      }
}

export default Authorized;