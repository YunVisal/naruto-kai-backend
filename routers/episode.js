const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const episodeController = require('../controllers/episode');
const asyncHandler = require('../middlewares/async');
const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/thumbnail/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

router.get('/', asyncHandler(async (req, res) => {
    const episode = await episodeController.getEpisodes();
    res.send({ msg: 'Success!!!', data: episode });
}));

router.post('/', auth, upload.single("thumbnail_url"), asyncHandler(async (req, res) => {
    try {
        req.body.thumbnail_url = req.file.originalname;
    } catch (err) {
        req.body.thumbnail_url = null;
    }
    const episode = await episodeController.postEpisode(req.body);
    res.status(200).json({ msg: 'Success!!!', data: episode });
}));

router.get('/all', auth, asyncHandler(async (req, res) => {
    const episodes = [];
    fs.readFile(path.resolve(__dirname, "../assets/episode.tsv"), 'utf8', async (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        const temp = data.split('\n');
        for(let i = 1; i < temp.length; i++){
            let entry = temp[i].split('\t');
            entry[4] = entry[4].substring(0, entry[4].indexOf("\r"));
            const data = {
                episode: entry[0],
                title: entry[1],
                arc_id: entry[2],
                duration: entry[3],
                thumbnail_url: entry[4]
            };
            const episode = await episodeController.postEpisode(data);
            episodes.push(episode);
        }
    });
    res.status(200).json({msg: 'Done!!!', episode: episodes});
}));

router.put('/:id', auth, upload.single("thumbnail_url"), asyncHandler(async (req, res) => {
    try {
        req.body.thumbnail_url = req.file.originalname;
    } catch (err) {
        req.body.thumbnail_url = null;
    }
    const episode = await episodeController.updateEpisode(req.params.id, req.body)
    res.status(200).json({ msg: 'Success!!!', data: episode });
}));

router.delete('/:id', auth, asyncHandler(async (req, res) => {
    await episodeController.deleteEpisode(req.params.id);
    res.status(200).json({ msg: 'Success!!!' });
}));

router.delete('/', auth, asyncHandler(async (req, res) => {
    await episodeController.deleteEpisodes();
    res.status(200).json({ msg: 'Success!!!' });
}));

module.exports = router;