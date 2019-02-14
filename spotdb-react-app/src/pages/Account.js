import React from 'react';
import '../layouts/Account.css';

class Account extends React.Component {
    render() {
        var callbackUri = 'http://localhost:5000/accountinfo'
        return (
            <div>
                <h1>This is my account page</h1>
            </div>
        );
    }
}

export default Account;