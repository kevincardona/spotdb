const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const config        = require('../config');

const artistSchema = new Schema({
    name: {
        type: String
    },
    good: {}, bad: {}, combined: {}
})

mongoose.connect('mongodb://localhost:27017/spotdb');

const Artist = mongoose.model('Score', artistSchema);
exports.Artist = Artist;
