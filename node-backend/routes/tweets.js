var mongoose      = require('mongoose');
var config        = require('../config');
const ArtistModel = require('../models/artist.js').Artist;


var getTweetInfo = (req, res) => {
  mongoose.connect('mongodb://localhost:27017/spotdb');
  var db = mongoose.connection;
  ArtistModel.find({}, null, {sort: {combined: -1}}, (err, data) =>{
    res.send(data);
  })
};

var functions = {
  getTweetInfo: getTweetInfo
}

module.exports = functions;
