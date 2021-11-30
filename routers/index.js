const episodeRouter = require('./episode');
const arcRouter = require('./arc');
const authRouter = require('./auth')

module.exports = app => {
    app.use('/api/episode', episodeRouter);
    app.use('/api/arc', arcRouter);
    app.use('/api/auth', authRouter);
};