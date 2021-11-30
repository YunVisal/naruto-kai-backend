const express = require('express');

const router = express.Router();

const episodeController = require('../controllers/episode');
const asyncHandler = require('../middlewares/async');
const auth = require('../middlewares/auth');

router.get('/', asyncHandler(async (req, res) => {
    const episode = await episodeController.getEpisodes();
    res.send({ msg: 'Success!!!', data: episode });
}));

router.post('/', auth, asyncHandler(async (req, res) => {
    const episode = await episodeController.postEpisode(req.body);
    res.send({ msg: 'Success!!!', data: episode });
}));

router.put('/:id', auth, asyncHandler(async (req, res) => {
    const episode = await episodeController.updateEpisode(req.params.id, req.body)
    res.send({ msg: 'Success!!!', data: episode });
}));

router.delete('/:id', auth, asyncHandler(async (req, res) => {
    await episodeController.deleteEpisode(req.params.id);
    res.send({ msg: 'Success!!!' });
}));

module.exports = router;