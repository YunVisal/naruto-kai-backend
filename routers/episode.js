const express = require('express');
const multer = require('multer');

const router = express.Router();

const episodeController = require('../controllers/episode');
const asyncHandler = require('../middlewares/async');
const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/thumbnail/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

router.get('/', asyncHandler(async (req, res) => {
    const episode = await episodeController.getEpisodes();
    res.send({ msg: 'Success!!!', data: episode });
}));

router.post('/', auth, upload.single("thumbnail_url"), asyncHandler(async (req, res) => {
    req.body.thumbnail_url = req.file.originalname;
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