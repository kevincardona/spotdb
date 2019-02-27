const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const config        = require('../config');

const userSchema = new Schema({
    spotify_id: {
        type: String
    },
    username: {
        type: String
    },
    token: {
        type: String
    },
    last_location: {
        type: [Number],
        default: null
    },
    top_artist: {
        type: String
    },
    last_song: {
        type: String
    }
})

mongoose.connect(config.mongo_url);

const User = mongoose.model('User', userSchema);
exports.User = User;
