var mongoose      = require('mongoose');
var config        = require('../config');
const AddArtistModel = require('../models/addArtist.js').AddArtist;

var addArtistToDB = (req, res) => {
  mongoose.connect(config.mongo_url);
  AddArtistModel.find({name: req.body.name}, (err, data) =>{
    if(data.length == 0){
      let addArtist = new AddArtistModel({name: req.body.name});
      addArtist.save(function (err) {
        if (err) return handleError(err);
        res.send({success: true});
        // saved!
      });
    }
  })
  res.send({success: true});
};

module.exports = {
  addArtistToDB: addArtistToDB
};
