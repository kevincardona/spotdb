const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const config        = require('../config');

const artistSchema = new Schema({
    name: {
        type: String
    },
    good: {}, bad: {}, combined: {}, scores: {}
})

mongoose.connect(config.mongo_url);

const Artist = mongoose.model('Score', artistSchema);
exports.Artist = Artist;
