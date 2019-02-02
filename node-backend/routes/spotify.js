var SpotifyWebApi = require('spotify-web-api-node');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var spotify_client_id = process.env.SPOTIFY_API_ID;
var spotify_client_secret = process.env.SPOTIFY_API_SECRET;
var spotify = new SpotifyWebApi({
    id: spotify_client_id,
    secret: spotify_client_secret,
    redirectUri: 'http://localhost:3000/authorized'
  });

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
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
    
}

var authorized = (req, res) => {
    var code = req.query.code;
    var state = req.query.state;
    spotify.authorizationCodeGrant(code).then(function(data) {
      console.log('The token expires in ' + data['expires_in']);
      console.log('The access token is ' + data['access_token']);
      console.log('The refresh token is ' + data['refresh_token']);
    /* Ok. We've got the access token!
         Save the access token for this user somewhere so that you can use it again.
         Cookie? Local storage?
      */

      /* Redirecting back to the main page! :-) */
      //res.redirect('/');

    }, function(err) {
      res.status(err.code);
      res.send(err.message);
    })
}


module.exports = {
    login: login,
    getaccess: getaccess,
    search: search,
    authorized: authorized
}