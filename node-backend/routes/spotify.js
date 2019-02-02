if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var spotify_client_id = process.env.SPOTIFY_API_ID;
var spotify_client_secret = process.env.SPOTIFY_API_SECRET;
//var spoitfy_oauth_token = require('spotdb-react-app/src/pages/login');
//console.log(spoitfy_oauth_token)

var login = (req, res) => {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + spotify_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent('http://localhost:3000/authorized'));
}

var getaccess = (req, res) => {
    var code = req.body.code;
    console.log(code);
}

var search = (req, res) => {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        headers: {
            'Authorization': 'Bearer ' + spoitfy_oauth_token
        }, 

    })
}

module.exports = {
    login: login,
    getaccess: getaccess,
    search: search
}