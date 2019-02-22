var request = require('request')
var config      = require('../config');
var mongoose    = require('mongoose');
var jwt         = require('jsonwebtoken');
const UserModel = require('../models/user.js').User;
mongoose.connect(config.mongo_url);
mongoose.Promise = global.Promise

var login = (req, res) => {
    var scopes = 'user-read-private user-read-email user-read-birthdate user-read-email playlist-read-private user-library-read user-library-modify user-top-read playlist-read-collaborative playlist-modify-public playlist-modify-private user-follow-read user-follow-modify user-read-playback-state user-read-currently-playing user-modify-playback-state user-read-recently-played'
    
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + process.env.SPOTIFY_API_ID+
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent('http://localhost:3000/authorized'));
}

var get = (req, res) => {
    var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': "Bearer " + req.decoded.token
        },
        json: true
    }
    request.get(options, (error, response, body) => {
        console.log(body)
    })
}

var accountInfo = (req, res) => {
    var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': "Bearer " + req.decoded.spotify_token
        },
        json: true
    }
    request.get(options, (error, response, body) => {
        if (error) {
            return res.json({success: false, loggedin: false, error: error});
        }
        return res.json({success: true, user: body})
    })
}

var search = (req, res) => {
    var options = {
        url: 'https://api.spotify.com/v1/search?q='+req.query.q+'&type='+req.query.type,
        headers: {
            'Authorization': "Bearer " + req.decoded.token
        },
        json: true
    }
    request.get(options, (error, response, body) => {
        console.log(body.artists)
    })
}

var listening = (req, res) => {
  //  https://api.spotify.com/v1/me/player/currently-playing

    var options = {
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        headers: {
            'Authorization': "Bearer " + req.decoded.spotify_token
        },
        json: true
    }
    request.get(options, (error, response, body) => {
        if (error) {
            return res.json({success: false, error: error});
        }
        UserModel.findOne({spotify_id: req.decoded.spotify_id}, function(error, result) {
            if (!error) {
                try {
                result.last_song = body.item.id;
                } catch (err) {
                    return res.json({success: false});
                }
                //result.last_song = body.user.item.name;

                result.save(function(error) {
                    if (!error) {
                        return res.json({success: true, user: body})
                    } else {
                        return res.json({success: false, error: error});
                    }
                });
            }
        });
    })
}

var currentListeners = (req, res) => {
    UserModel.count({last_song: req.body.song_id}, function(error, result) {
        if (!error) {
            return res.json({success: true, listeners: result}); 
        } else {
            return res.json({success: false, message: 'Failed to gather current listener count'});
        }
    });
}

module.exports = {
    login: login,
    search: search,
    accountInfo: accountInfo,
    listening: listening,
    currentListeners: currentListeners
}