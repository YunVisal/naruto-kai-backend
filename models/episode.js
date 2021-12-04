const mongoose = require('mongoose');

const episodeSchema = mongoose.Schema({
    episode: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    arc_id: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        require: true
    },
    thumbnail_url: {
        type: String,
        require: false,
        default: null,
    },
    video_url: {
        type: String,
        require: false,
        default: null
    }
});

module.exports = mongoose.model('Episode', episodeSchema)