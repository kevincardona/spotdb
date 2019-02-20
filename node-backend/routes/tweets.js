var mongoose    = require('mongoose');
var config      = require('../config');


var getTweets = (req, res) => {
  console.log('here');
  mongoose.connect(config.mongo_url);
  var db = mongoose.connection;
  db.once('open', function() {
    return res.json({success: true, message: "Connected to mongoose"});
  });
};

var functions = {
  getTweets: getTweets
}

module.exports = functions;
