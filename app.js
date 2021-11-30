const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json())
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome to Naruto Kai!');
});

require('./routers/index')(app);

mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@db:27017/?authSource=admin`)
.then(() => {
    app.listen(3000, () => {
        console.log('Connected to server!');
    })
})
.catch(err => {
    console.log(err);
})