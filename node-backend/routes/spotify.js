if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var spotify_client_id = process.env.SPOTIFY_API_ID;
var spotify_client_secret = process.env.SPOTIFY_API_SECRET;

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

module.exports = {
    login: login,
    getaccess: getaccess
}