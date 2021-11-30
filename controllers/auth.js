const bcrypt = require('bcrypt');
const User = require('../models/user');

const registerUser = async (body) => {
    let user = await User.findOne({ email: body.email })
    if (user) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);
    body.password = hash;

    user = new User(body);
    await user.save();

    const token = user.genAuthToken();
    return token;
};

const loginUser = async (body) => {
    let user = await User.findOne({ email: body.email })
    if (!user) {
        return;
    }

    const passwordValidation = await bcrypt.compare(body.password, user.password)
    if (!passwordValidation) {
        return;
    }

    const token = user.genAuthToken()
    return token;
};

const getUser = async (req) => {
    const user = await User.findOne({email: req.user.email});
    return user;
}

module.exports = {
    registerUser,
    loginUser,
    getUser
};