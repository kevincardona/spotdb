const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const config        = require('../config');

const addArtistSchema = new Schema({
    name: {
        type: String
    },
}, {versionKey: false});

mongoose.connect(config.mongo_url);

const AddArtist = mongoose.model('Artist', addArtistSchema);
exports.AddArtist = AddArtist;
