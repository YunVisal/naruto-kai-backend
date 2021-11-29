const episodeRouter = require('./episode');
const arcRouter = require('./arc');

module.exports = app => {
    app.use('/api/episode', episodeRouter);
    app.use('/api/arc', arcRouter);
};