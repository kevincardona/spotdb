var request = require("request");
var config = require("../config");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const UserModel = require("../models/user.js").User;
const querystring = require("querystring");
mongoose.connect(config.mongo_url);
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var login = (req, res) => {
  var scopes =
    "user-read-private user-read-email user-read-birthdate user-read-email playlist-read-private user-library-read user-library-modify user-top-read playlist-read-collaborative playlist-modify-public playlist-modify-private user-follow-read user-follow-modify user-read-playback-state user-read-currently-playing user-modify-playback-state user-read-recently-played";

  res.redirect(
    "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      process.env.SPOTIFY_API_ID +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent("http://localhost:3000/authorized")
  );
};

/*
var get = (req, res) => {
    var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': "Bearer " + req.decoded.spotify_token
        },
        json: true
    }
    request.get(options, (error, response, body) => {
    })
}
*/

var accountInfo = (req, res) => {
  var options = {
    url: "https://api.spotify.com/v1/me",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  request.get(options, (error, response, body) => {
    if (error) {
      return res.json({ success: false, loggedin: false, error: error });
    }

    request.get(options, (error, response, body) => {
      if (error) {
        return res.json({
          success: false,
          loggedin: false,
          error: error
        });
      }
      return res.json({
        success: true,
        user: body
      });
    });
  });
};

var saveSong = (req, res) => {
  //first check to see they search for a song (aka if song option is checked before search)
  //to get songId, you can get 'key' from window (html)
  var songId = req.query.id.substring(0, req.query.id.length - 1);
  var options = {
    url: "https://api.spotify.com/v1/me/tracks?ids=" + songId, //try to hardcode ID and add to library
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  request.put(options, function(error, response, body) {
    // console.log(response.statusMessage);
    if (error) {
      return res.json({
        success: false,
        err: error
      });
    }
    return res.json({ success: true, user: body });
  });
};

var pause = (req, res) => {
  var options = {
    url: "https://api.spotify.com/v1/me/player/pause",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  request.put(options, function(error, response, body) {
    if (error) {
      return res.json({
        success: false,
        err: error
      });
    }
    return res.json({ success: true, user: body });
  });
};

var play = (req, res) => {
  var songId = "";
  if (req.query && req.query.id) {
    songId = req.query.id;
    if (req.query.id.slice(-1) === "/") {
      songId = req.query.id.substring(0, req.query.id.length - 1);
    }
  }
  var options = {
    url: "https://api.spotify.com/v1/me/player/play",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  if (songId) {
    options.body = {
      uris: ["spotify:track:" + songId]
    };
  }
  // console.log(options);
  request.put(options, function(error, response, body) {
    // console.log(response.statusMessage);
    if (error) {
      return res.json({
        success: false,
        err: error
      });
    }
    return res.json({ success: true, user: body });
  });
};

var library = (req, res) => {
  var options = {
    url: "https://api.spotify.com/v1/me/tracks?market=ES&limit=20",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  request.get(options, (error, response, body) => {
    if (error) {
      return res.json({ success: false, error: error });
    }
    let cleaned = { items: [] };
    for (let i of body.items) {
      cleaned.items.push(i.track);
    }
    return res.json({ success: true, user: cleaned });
  });
};

var search = (req, res) => {
  var queryStr = querystring.stringify(req.query);
  queryStr = queryStr.substring(6, queryStr.length - 3);
  //console.log(queryStr)
  //used for artist search
  var options = {
    url:
      "https://api.spotify.com/v1/search?q=" +
      queryStr +
      "&type=artist,album,track&limit=8",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  //used for song search
  var options2 = {
    url: "https://api.spotify.com/v1/search?q=" + queryStr + "&type=track",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  //console.log(options.url)
  request.get(options, (error, response, body) => {
    //console.log(body.artists)
    if (error) {
      return res.json({ success: false, error: error });
    }
    return res.json({ success: true, user: body });
  });
};

var artist = (req, res) => {
  var id = req.query.query;
  id = id.substring(0, id.length - 1);
  //console.log(id)
  var options = {
    url: "https://api.spotify.com/v1/artists/" + id,
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  //console.log(options.url)
  request.get(options, (error, response, body) => {
    //console.log(body)
    if (error) {
      return res.json({
        success: false,
        error: error
      });
    }
    return res.json({
      success: true,
      user: body
    });
  });
};

var artistAlbums = (req, res) => {
  var id = req.query.query;
  id = id.substring(0, id.length - 1);
  // (id);
  var options = {
    url:
      "https://api.spotify.com/v1/artists/" +
      id +
      "/albums?include_groups=album,single",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  //console.log(options.url)
  request.get(options, (error, response, body) => {
    // console.log(body);
    if (error) {
      return res.json({ success: false, error: error });
    }
    // console.log(body);
    return res.json({ success: true, user: body });
  });
};

var albumTracks = (req, res) => {
  var id = req.query.query;
  id = id.substring(0, id.length - 1);
  // console.log(id);
  var options = {
    url: "https://api.spotify.com/v1/albums/" + id + "/tracks",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  //console.log(options.url)
  request.get(options, (error, response, body) => {
    // console.log(body);
    if (error) {
      return res.json({ success: false, error: error });
    }
    return res.json({ success: true, user: body });
  });
};

var listening = (req, res) => {
  var options = {
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  request.get(options, function(error, response, body) {
    if (error) {
      return res.json({
        success: false,
        error: error
      });
    }
    UserModel.findOne(
      {
        spotify_id: req.decoded.spotify_id
      },
      function(err, result) {
        if (!err) {
          try {
            result.last_song.id = body.item.id;
            result.last_song.name = body.item.name;
            result.last_song.artist = body.item.artists[0].id;
            result.last_song.image_url = body.item.album.images[0].url;
          } catch (error1) {
            // console.log(err);
            return res.json({
              success: false,
              error: error1
            });
          }

          result.save(function(error) {
            if (!error) {
              return res.json({
                success: true,
                user: body
              });
            } else {
              console.log(error);
              return res.json({
                success: false,
                error: error
              });
            }
          });
        }
      }
    );
  });
};

var currentListeners = (req, res) => {
  UserModel.count(
    {
      "last_song.id": req.body.song_id
    },
    function(error, result) {
      if (!error) {
        return res.json({
          success: true,
          listeners: result
        });
      } else {
        console.log(error);
        return res.json({
          success: false,
          message: "Failed to gather current listener count"
        });
      }
    }
  );
};

var localListeners = (req, res) => {
  var list = UserModel.find(
    {
      zip: req.body.zip
    },
    (err, list) => {
      if (err)
        return res.json({
          success: false,
          message: "Failed to gather local listeners"
        });

      var locations = list.map(user => user.location);
      var songs = list.map(user => user.last_song);
      var song_counts = {};
      var artist_counts = new Proxy(
        {},
        { get: (target, name) => (name in target ? target[name] : 0) }
      );

      for (var i = 0; i < list.length; i++) {
        if (song_counts[songs[i].id]) {
          song_counts[songs[i].id].count++;
        } else {
          var song = {
            id: songs[i].id,
            name: songs[i].name,
            artist: songs[i].artist,
            count: 1
          };
          song_counts[songs[i].id] = song;
        }
      }
      var artist_counts = list.reduce((p, c) => {
        if (c.top_artists.length > 0) {
          var name = c.top_artists[0];
          if (!p.hasOwnProperty(name)) {
            p[name] = 0;
          }
          p[name]++;
          return p;
        }
      }, {});
      //console.log(song_counts);
      return res.json({
        success: true,
        locations: locations,
        location_songs: songs,
        top_songs: song_counts,
        top_artists: artist_counts
      });
    }
  );
};

var topArtists = (req, res) => {
  var options = {
    url: "https://api.spotify.com/v1/me/top/artists",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  request.get(options, (error, response, body) => {
    if (error) {
      return res.json({ success: false, error: error });
    }
    request.get(options, (error, response, body) => {
      if (error) {
        return res.json({
          success: false,
          error: error
        });
      }
      UserModel.findOne(
        {
          spotify_id: req.decoded.spotify_id
        },
        function(error, result) {
          if (!error) {
            try {
              var top_artists = [];
              for (var i = 0; i < 5 && i < body.items.length - 1; i++) {
                var temp = {
                  id: body.items[i].id,
                  name: body.items[i].name,
                  image_url: body.items[i].images[0].url
                };
                top_artists.push(temp);
              }
              result.top_artists = top_artists;

              //(top_artists);
            } catch (err) {
              console.log(err);
              return res.json({
                success: false
              });
            }

            result.save(function(error) {
              if (!error) {
                return res.json({
                  success: true,
                  user: body
                });
              } else {
                return res.json({
                  success: false,
                  error: error
                });
              }
            });
          }
        }
      );
    });
  });
};

module.exports = {
  login: login,
  search: search,
  listening: listening,
  currentListeners: currentListeners,
  localListeners: localListeners,
  accountInfo: accountInfo,
  artist: artist,
  albumTracks: albumTracks,
  artistAlbums: artistAlbums,
  topArtists: topArtists,
  saveSong: saveSong,
  library: library,
  play: play,
  pause: pause
};
