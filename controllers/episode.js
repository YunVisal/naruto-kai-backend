const Episode = require('../models/episode');

const getEpisodes = async () => {
    const episode = await Episode.find();
    return episode;
};

const postEpisode = async (body) => {
    const episode = new Episode(body);
    await episode.save();
    return episode;
};

const updateEpisode = async(id, body) => {
    const episodeId = await Episode.find({episode: id});
    const updatedEpisode = await Episode.findByIdAndUpdate(
        episodeId,
        body,
        {new: true}
    );
    return updatedEpisode;
};

const deleteEpisode = async(id) => {
    const episodeId = await Episode.find({episode: id});
    await Episode.findByIdAndDelete(episodeId);
}

const deleteEpisodes = async() => {
    await Episode.remove({});
}

module.exports = {
    getEpisodes,
    postEpisode,
    updateEpisode,
    deleteEpisode,
    deleteEpisodes
}