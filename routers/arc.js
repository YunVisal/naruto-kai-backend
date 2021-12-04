const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const arcController = require('../controllers/arc');
const asyncHandler = require('../middlewares/async');
const auth = require('../middlewares/auth');

const router = express.Router();

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
    const arc = await arcController.getArc();
    res.status(200).json({msg: "Success!!!", data: arc});
}));

router.post('/', auth, upload.single("thumbnail_url"), asyncHandler(async (req, res) => {
    try {
        req.body.thumbnail_url = req.file.originalname;
    } catch (err) {
        req.body.thumbnail_url = null;
    }
    const arc = await arcController.postArc(req.body);
    res.status(200).json({msg: "Success!!!", data: arc});
}));

router.get('/all', auth, asyncHandler(async (req, res) => {
    const arcs = [];
    fs.readFile(path.join(__dirname, 'dataa.tsv'), 'utf8', async (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        const temp = data.split('\n');
        for(let i = 1; i < temp.length; i++){
            let entry = temp[i].split('\t');
            entry[2] = entry[2].substring(0, entry[2].indexOf("\r"));
            const data = {
                id: entry[0],
                title: entry[1],
                description: entry[2]
            };
            const arc = await arcController.postArc(data);
            arcs.push(arc);
        }
    });
    res.status(200).json({msg: 'Done!!!', arc: arcs});
}));

router.put('/:id', auth, upload.single("thumbnail_url"), asyncHandler(async (req, res) => {
    try {
        req.body.thumbnail_url = req.file.originalname;
    } catch (err) {
        req.body.thumbnail_url = null;
    }
    const arc = await arcController.updateArc(req.params.id, req.body);
    res.status(200).json({msg: "Success!!!", data: arc});
}));

router.delete('/:id', auth, asyncHandler(async (req, res) => {
    await arcController.deleteArc(req.params.id);
    res.status(200).json({msg: "Success!!!"});
}));

module.exports = router;