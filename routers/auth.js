const express = require('express');

const authController = require('../controllers/auth');
const asyncHandler = require('../middlewares/async');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/register', asyncHandler(async (req, res) => {
    const token = await authController.registerUser(req.body);

    if(token){
        res.status(200).json({ msg: 'Success!!!', token: token });
    } else{
        res.status(400).json({ message: "User alread exits!" });
    }
}));

router.post('/login', asyncHandler(async (req, res) => {
    const token = await authController.loginUser(req.body);

    if(token){
        res.status(200).json({ msg: 'Success!!!', token: token });
    } else{
        res.status(400).json({ message: "Wrong Name and Password!" });
    }
}));

router.get('/user', auth, asyncHandler(async (req, res) => {
    const user = await authController.getUser(req);
    res.status(200).json({ msg: 'Success!!!', user: user });
}));

module.exports = router;