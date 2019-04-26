var mongoose      = require('mongoose');
var config        = require('../config');
const AddArtistModel = require('../models/addArtist.js').AddArtist;

var addArtistToDB = (req, res) => {
  console.log(req.body.name);
  mongoose.connect(config.mongo_url);
  AddArtistModel.find({name: req.body.name}, (err, data) =>{
    console.log(data.length);
    if(data.length == 0){
      let addArtist = new AddArtistModel({name: req.body.name});
      console.log('should add');
      addArtist.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });
    }
  })
};

module.exports = {
  addArtistToDB: addArtistToDB
};
