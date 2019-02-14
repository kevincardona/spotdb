var SpotifyWebApi = require('spotify-web-api-node');
var request = require('request')
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var FormData = require('form-data');
//var Buffer = require('buffer/').Buffer

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var spotify_client_id = process.env.SPOTIFY_API_ID;
var spotify_client_secret = process.env.SPOTIFY_API_SECRET;
var access_token;
var refresh_token;
var expires_in;

//var scopes = ['user-read-private', 'user-read-email'];
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
        //console.log(body)
    })

}

var accountInfo = (req, res) => {
    var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': "Bearer " + access_token
        },
        json: true
    }
    request.get(options, (error, response, body) => {
        console.log(body)
    })
}

var search = (req, res) => {
    var options = {
        url: 'https://api.spotify.com/v1/search?q='+req.query.q+'&type='+req.query.type,
        headers: {
            'Authorization': "Bearer " + access_token
        },
        json: true
    }
    request.get(options, (error, response, body) => {
        console.log(body.artists)
    })
}


module.exports = {
    login: login,
    search: search,
    authorized: authorized,
    accountInfo: accountInfo
}