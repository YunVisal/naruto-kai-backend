const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(express.json())
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome to Naruto Kai!');
});

require('./routers/index')(app);

mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@db:27017/?authSource=admin`)
.then(() => {
    app.listen(80, () => {
        console.log('Connected to server!');
    })
})
.catch(err => {
    console.log(err);
})