var request = require('request')
var config      = require('../config');
var mongoose    = require('mongoose');
var jwt         = require('jsonwebtoken');
const UserModel = require('../models/user.js').User;
const querystring = require('querystring')
mongoose.connect(config.mongo_url);
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

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
            'Authorization': "Bearer " + req.decoded.spotify_token
        },
        json: true
    }
    request.get(options, (error, response, body) => {
        //console.log(body)
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
    var queryStr = querystring.stringify(req.query)
    queryStr = queryStr.substring(6, queryStr.length-3)
    console.log(queryStr)
    var options = {
        url: 'https://api.spotify.com/v1/search?q='+queryStr+'&type=artist',
        headers: {
            'Authorization': "Bearer " + req.decoded.spotify_token
        },
        json: true
    }
    //console.log(options.url)
    request.get(options, (error, response, body) => {
        console.log(body.artists)
        if (error) {
            return res.json({success: false, error: error});
        }
        return res.json({success: true, user: body.artists})
    })
}

var artist = (req, res) => {
    var queryStr = querystring.stringify(req.query)
    queryStr = queryStr.substring(6, queryStr.length-3)
    console.log(queryStr)
    //queryStr = queryStr.substring(6, queryStr.length-3)
    //console.log(queryStr)
    var options = {
        url: 'https://api.spotify.com/v1/artists/'+queryStr,
        headers: {
            'Authorization': "Bearer " + req.decoded.spotify_token
        },
        json: true
    }
    //console.log(options.url)
    request.get(options, (error, response, body) => {
        //console.log(body)
        if (error) {
            return res.json({success: false, error: error});
        }
        return res.json({success: true, user: body})
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
                result.last_song_name = body.item.name;
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

var localListeners = (req, res) => {
    var list = UserModel.find({zip: req.body.zip }, (err, list) => {
        if (err)
            return res.json({success: false, message: 'Failed to gather local listeners'});

        var locations = list.map(user => user.location);
        var songs = list.map(user => user.last_song_name);
        var counts = list.reduce((p, c) => {
          var name = c.last_song_name;
          if (!p.hasOwnProperty(name)) {
            p[name] = 0;
          }
          p[name]++;
          return p;
        }, {});
        return res.json({success: true, locations: locations, songs: songs, top_songs: counts});
    })


    /*.select({location: 1, zip: 1, top_tracks: 1}).then( (result) => {
        return res.json({success: true, listeners: result});
    }).catch((err) => {
        return res.json({success: false, message: 'Failed to gather local listeners'});
    });*/

    /*
        , function(error, result) {
        if (!error) {
            return res.json({success: true, listeners: result});
        } else {
            return res.json({success: false, message: 'Failed to gather local listener count'});
        }
    });
    */
}

var topArtists = (req, res) => {
    var options = {
        url: 'https://api.spotify.com/v1/me/top/artists',
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
                    console.log(body.item.id);
                } catch (err) {
                    console.log(err);
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

module.exports = {
    login: login,
    search: search,
    listening: listening,
    currentListeners: currentListeners,
    localListeners: localListeners,
    accountInfo: accountInfo,
    artist: artist,
    topArtists: topArtists
}
