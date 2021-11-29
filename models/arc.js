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
    description: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('Arc', arcSchema);