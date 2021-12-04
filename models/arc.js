const mongoose = require('mongoose');

const arcSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    thumbnail_url: {
        type: String,
        require: false,
        default: null,
    },
    description: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('Arc', arcSchema);