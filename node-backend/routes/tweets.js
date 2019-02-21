var mongoose      = require('mongoose');
var config        = require('../config');
const ArtistModel = require('../models/artist.js').Artist;


var getTweets = (req, res) => {
  console.log('here');
  mongoose.connect(config.mongo_url);
  var db = mongoose.connection;
  ArtistModel.find({}, (err, data) =>{
    res.send(data);
  })
};

var functions = {
  getTweets: getTweets
}

module.exports = functions;
