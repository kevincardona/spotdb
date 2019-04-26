var config = require("../config");
var request = require("request");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

const UserModel = require("../models/user.js").User;
mongoose.connect(config.mongo_url);
mongoose.Promise = global.Promise;

var authenticate = (req, res, next) => {
    var token = req.header('token');

	if (!token) {
		return res.send({ success: false, message: 'No token provided' });
	}

	jwt.verify(token, config.secret, function(err, decoded) {
		if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token', loggedin: false });
		} else {

			req.decoded = decoded;
			next();
		}
	});
}

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var authorize = (req, res) => {
  var options = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: req.body.code,
      redirect_uri: process.env.FRONTEND_URL,
      grant_type: "authorization_code",
      client_id: process.env.SPOTIFY_API_ID,
      client_secret: process.env.SPOTIFY_API_SECRET
    },
    json: true
  };
  request.post(options, function(error, response, body) {
    if (error) {
      return res.json({ success: false, err: error });
    }
    access_token = response.body.access_token;
    refresh_token = response.body.refresh_token;
    expires_in = response.body.expires_in;

    var options = {
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: "Bearer " + access_token
      },
      json: true
    };
    request.get(options, (error, response1, body) => {
      if (error) {
        return res.json({ success: false, err: error });
      }

      UserModel.findOne({ spotify_id: response1.body.id }, function(
        error,
        result
      ) {
        if (!error) {
          // If the document doesn't exist
          if (!result) {
            // Create it
            result = new UserModel();
            result.spotify_id = response1.body.id;
            result.username = response1.body.display_name;
          }
          result.spotify_refresh_token = response.body.refresh_token;
          result.spotify_token = response.body.access_token;
          // Save the document
          var token_items = {
            spotify_id: response1.body.id,
            display_name: response1.body.display_name,
            spotify_token: response.body.access_token
          };
          jwt.sign(
            token_items,
            config.secret,
            { algorithm: "HS256", expiresIn: 99999 },
            (err, token) => {
              if (err) {
                return res.json({
                  success: false,
                  message: "Failed to sign jwt"
                });
              }

              result.save(function(error) {
                if (!error) {
                  return res.json({
                    success: true,
                    token: token,
                    id: response1.body.id,
                    display_name: response1.body.display_name
                  });
                } else {
                  return res.json({ success: false, error: error });
                }
              });
            }
          );
        }
      });
    });
  });
};

var setHome = (req, res) => {
    UserModel.findOne({spotify_id: req.decoded.spotify_id}, function (err, user) {
        if (!user) {
            return res.json({success: false, message: "No token provided", user:user, loggedin: false});
        }
        if (err)
            return res.json({success: false, error: err, user: user});
        
        var options = {
            url: 'https://api.spotify.com/v1/me/top/artists',
            headers: {
                'Authorization': "Bearer " + req.decoded.spotify_token
            },
            json: true
        }
        request.get(options, (error, response, body) => {
            if (error)
                return res.json({success: false, error: error, message: response});
            user.location.latlon = req.body.last_location;
            if (req.body.position)
            user.zip = req.body.position.zip;
            try{
            user.top_artist = body.items[0].external_urls.spotify;
            user.save(function(err) {
                if (err)
                    return res.json({success: false, error: err});
                return res.json({success: true, message: 'Successfully updated home'});
            })
            } catch(e) {
                return res.json({success:false});
            }
        })
    })
}

var getHome = (req, res) => {
  UserModel.findOne({ spotify_id: req.decoded.spotify_id }, function(
    err,
    user
  ) {
    if (err || !user) return res.json({ success: false, error: err });
    return res.json({
      success: true,
      last_location: user.location.latlon,
      zip: user.location.zip
    });
  });
};

var functions = {
  authorize: authorize,
  authenticate: authenticate,
  setHome: setHome,
  getHome: getHome
};

module.exports = functions;
