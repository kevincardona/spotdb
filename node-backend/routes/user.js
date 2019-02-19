var config      = require('../config');
var request = require('request')
var mongoose    = require('mongoose');
const UserModel = require('../models/user.js').User;
mongoose.connect(config.mongo_url);
mongoose.Promise = global.Promise;


var setHome = (req, res) => {
    UserModel.findOne({token: req.header('token')}, function (err, user) {
        if (!user) {
            return res.json({success: false, message: "No token provided", user:user, loggedin: false});
        }
        if (err)
            return res.json({success: false, error: err, user: user});
        
        var options = {
            url: 'https://api.spotify.com/v1/me/top/artists',
            headers: {
                'Authorization': "Bearer " + req.header('token')
            },
            json: true
        }
        request.get(options, (error, response, body) => {
            if (error)
                return res.json({success: false, error: error, message: response});
            try {
                if (body.items)
                    if (body.items[0].external_urls.spotify)
                        user.top_artist = body.items[0].external_urls.spotify;
                user.last_location = req.body.last_location;
                user.save(function(err) {
                    if (err)
                        return res.json({success: false, error: err});
                    return res.json({success: true, message: 'Successfully updated home'});
                })
            } catch (error) {
                var err = error;
                return res.json({success: false, message:'Exception caught'});
            }
        })
    })
}

var getHome = (req, res) => {
    UserModel.findOne({token: req.header('token')}, function (err, user) {
        if (err || !user)
            return res.json({success: false, error: err});
        return res.json({success: true, last_location: user.last_location});
    })
}

var functions = {
    setHome: setHome,
    getHome: getHome,
}

module.exports = functions;