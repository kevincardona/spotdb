var SpotifyWebApi = require('spotify-web-api-node');
var request = require('request')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var FormData = require('form-data');
//var Buffer = require('buffer/').Buffer

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var spotify_client_id = process.env.SPOTIFY_API_ID;
var spotify_client_secret = process.env.SPOTIFY_API_SECRET;

//var scopes = ['user-read-private', 'user-read-email'];

var spotify = new SpotifyWebApi({
    clientId: spotify_client_id,
    clientSecret: spotify_client_secret,
    redirectUri: 'http://localhost:3000/authorized'
  });

var login = (req, res) => {
    var scopes = 'user-read-private user-read-email'
    
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + spotify_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent('http://localhost:3000/authorized'));
}

/* var getaccess = (req, res) => {
    //var code = res.body.code;
    console.log(req.body);
    console.log('------------')
    console.log(res.body);
} */

var authorized = (req, res) => {
    var code = req.query.code; 
    var state = req.query.state;
    var access_token;
    var refresh_token;
    var expires_in;

    var options = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: 'http://localhost:3000/authorized',
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64'))
        },
        json: true
    }
    request.post(options, function(error, response, body) {
        access_token = body.access_token;
        refresh_token = body.refresh_token;
        expires_in = body.expires_in;
        console.log(body)
    })

}

var search = (req, res) => {
    spotify.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 10, offset: 20 }).then(
    function(data) {
      console.log('Album information', data.body);
    },
    function(err) {
      console.error(err);
    }
  );
}


module.exports = {
    login: login,
    search: search,
    authorized: authorized
}