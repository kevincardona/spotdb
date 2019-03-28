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

var get = (req, res) => {
  var options = {
    url: "https://api.spotify.com/v1/me",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  request.get(options, (error, response, body) => {
    //console.log(body)
  });
};

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
    return res.json({ success: true, user: body });
  });
};

var saveSong = (req, res) => {
  //first check to see they search for a song (aka if song option is checked before search)
  //to get songId, you can get 'key' from window (html)
  var songId = req.query.id;
  //songId = songId.substring(6, songId.length - 3); //FIGURE OUT ACTUAL SUBSTRING INDICES
  var options = {
    url: "https://api.spotify.com/v1/me/tracks?ids=" + songId,
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  var options2 = {
      method: 'PUT',
      uurl: "https://api.spotify.com/v1/me/tracks?ids=" + songId,
      headers: {
        Authorization: "Bearer " + req.decoded.spotify_token
      },
      json: true
  }
  request(options2, function(error, response, body) {
    if (error) {
      return res.json({ success: false, err: error });
    }
    console.log(response.body);
  });
};

var library = (req, res) => {
  var options = {
    url: "https://api.spotify.com/v1/me/tracks?market=ES&limit=30",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  request.get(options, (error, response, body) => {
    //console.log(body)
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
  //console.log(id);
  var options = {
    url: "https://api.spotify.com/v1/artists/" + id,
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  //console.log(options.url)
  request.get(options, (error, response, body) => {
    //console.log(body);
    if (error) {
      return res.json({ success: false, error: error });
    }
    return res.json({ success: true, user: body });
  });
};

var artistAlbums = (req, res) => {
  var id = req.query.query;
  id = id.substring(0, id.length - 1);
  //console.log(id);
  var options = {
    url: "https://api.spotify.com/v1/artists/" + id + "/albums",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  //console.log(options.url)
  request.get(options, (error, response, body) => {
    //console.log(body);
    if (error) {
      return res.json({ success: false, error: error });
    }
    return res.json({ success: true, user: body });
  });
};

var albumTracks = (req, res) => {
  var id = req.query.query;
  id = id.substring(0, id.length - 1);
  //console.log(id);
  var options = {
    url: "https://api.spotify.com/v1/albums/" + id + "/tracks",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  //console.log(options.url)
  request.get(options, (error, response, body) => {
    //console.log(body);
    if (error) {
      return res.json({ success: false, error: error });
    }
    return res.json({ success: true, user: body });
  });
};

var listening = (req, res) => {
  //  https://api.spotify.com/v1/me/player/currently-playing

  var options = {
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    headers: {
      Authorization: "Bearer " + req.decoded.spotify_token
    },
    json: true
  };
  request.get(options, (error, response, body) => {
    if (error) {
      return res.json({ success: false, error: error });
    }
    UserModel.findOne({ spotify_id: req.decoded.spotify_id }, function(
      error,
      result
    ) {
      if (!error) {
        try {
          result.last_song = body.item.id;
        } catch (err) {
          return res.json({ success: false });
        }
        //result.last_song = body.user.item.name;

        result.save(function(error) {
          if (!error) {
            return res.json({ success: true, user: body });
          } else {
            return res.json({ success: false, error: error });
          }
        });
      }
    });
  });
};

var currentListeners = (req, res) => {
  UserModel.count({ last_song: req.body.song_id }, function(error, result) {
    if (!error) {
      return res.json({ success: true, listeners: result });
    } else {
      return res.json({
        success: false,
        message: "Failed to gather current listener count"
      });
    }
  });
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
    return res.json({ success: true, user: body });
  });
};

var topLocalTrack = (req, res) => {
  if (!req.body.zip) {
    return res.json({
      success: false,
      message: "Insufficient body information"
    });
  }
};

module.exports = {
  login: login,
  search: search,
  listening: listening,
  currentListeners: currentListeners,
  accountInfo: accountInfo,
  artist: artist,
  artistAlbums: artistAlbums,
  albumTracks: albumTracks,
  topArtists: topArtists,
  saveSong: saveSong,
  library: library
};
