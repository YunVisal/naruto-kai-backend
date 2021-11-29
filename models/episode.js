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
    thumbnail_url: {
        type: String,
        require: true
    },
    video_url: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('Episode', episodeSchema)