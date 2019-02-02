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

module.exports = {
    login: login,
    getaccess: getaccess,
    search: search
}