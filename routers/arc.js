const express = require('express');

const arcController = require('../controllers/arc')
const asyncHandler = require('../middlewares/async')

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const arc = await arcController.getArc();
    res.send({msg: "Success!!!", data: arc});
}));

router.post('/', asyncHandler(async (req, res) => {
    const arc = await arcController.postArc(req.body);
    res.send({msg: "Success!!!", data: arc});
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const arc = await arcController.updateArc(req.params.id, req.body);
    res.send({msg: "Success!!!", data: arc});
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    await arcController.deleteArc(req.params.id);
    res.send({msg: "Success!!!"});
}));

module.exports = router;