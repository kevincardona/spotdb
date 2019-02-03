var SpotifyWebApi = require('spotify-web-api-node');

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
    //var scopes = ['user-read-private', 'user-read-email'];
    var scopes = 'user-read-private user-read-email'
    
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + spotify_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent('http://localhost:3000/authorized'));
    //var authorizeURL = spotify.createAuthorizeURL(scopes);
    //console.log(authorizeURL);
}

var getaccess = (req, res) => {
    //var code = res.body.code;
    console.log(req.body);
    console.log('------------')
    console.log(res.body);
}

var authorized = (req, res) => {
    var code = req.query.code; //we need this code
    var state = req.query.state;
    spotify.authorizationCodeGrant(code).then(function(data) {
      console.log('The token expires in ' + data['expires_in']);
      console.log('The access token is ' + data['access_token']);
      console.log('The refresh token is ' + data['refresh_token']);
    /* Ok. We've got the access token!
         Save the access token for this user somewhere so that you can use it again.
         Cookie? Local storage?
      */

      spotify.setAccessToken(data.body['access_token']);
      spotify.setRefreshToken(data.body['refresh_token']);

    }, function(err) {
      console.log('Something went wrong!')
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
    getaccess: getaccess,
    search: search,
    authorized: authorized
}