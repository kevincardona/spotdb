var mongoose      = require('mongoose');
var config        = require('../config');
const ArtistModel = require('../models/artist.js').Artist;


var getTweets = (req, res) => {
  mongoose.connect('mongodb://localhost:27017/spotdb');
  var db = mongoose.connection;
  ArtistModel.find({}, (err, data) =>{
    res.send(data);
  })
};

var functions = {
  getTweets: getTweets
}

module.exports = functions;
