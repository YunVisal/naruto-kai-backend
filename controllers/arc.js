const Arc = require('../models/arc');

const getArc = async () => {
    const arc = await Arc.find();
    return arc;
};

const postArc = async (body) => {
    const arc = new Arc(body);
    await arc.save();
    return arc;
};

const updateArc = async(id, body) => {
    const arcId = await Arc.find({id: id});
    const updatedArc = await Arc.findByIdAndUpdate(
        arcId,
        body,
        {new: true}
    );
    return updatedArc;
};

const deleteArc = async(id) => {
    const arcId = await Arc.find({id: id});
    await Arc.findByIdAndDelete(arcId);
}

module.exports = {
    getArc,
    postArc,
    updateArc,
    deleteArc
}