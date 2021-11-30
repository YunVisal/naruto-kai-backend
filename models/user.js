const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.genAuthToken = function () {
    const token = jwt.sign({_id: this._id, email: this.email, username: this.username}, process.env.secret_key);
    return token;
}

module.exports = mongoose.model('User', userSchema);