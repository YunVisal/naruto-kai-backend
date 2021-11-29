const express = require('express');

const router = express.Router();

const episodeController = require('../controllers/episode')

router.get('/', asyncHandler(async (req, res) => {
    const episode = await episodeController.getEpisodes();
    res.send({ msg: 'Success!!!', data: episode });
}));

router.post('/', asyncHandler(async (req, res) => {
    const episode = await episodeController.postEpisode(req.body);
    res.send({ msg: 'Success!!!', data: episode });
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const episode = await episodeController.updateEpisode(req.params.id, req.body)
    res.send({ msg: 'Success!!!', data: episode });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    await episodeController.deleteEpisode(req.params.id);
    res.send({ msg: 'Success!!!' });
}));

module.exports = router;