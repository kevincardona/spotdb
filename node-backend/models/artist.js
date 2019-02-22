const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const config        = require('../config');

const userSchema = new Schema({
    name: {
        type: String
    }
})

mongoose.connect(config.mongo_url);

const Artist = mongoose.model('Artist', userSchema);
exports.Artist = Artist;
