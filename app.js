const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./api/routes/coin');

const CapBit = require('./api/models/info');


app.listen(5000);

app.use("/info",router);


mongoose.connect('mongodb://localhost/abc' ,{ useMongoClient: true });
mongoose.Promise = global.Promise;




