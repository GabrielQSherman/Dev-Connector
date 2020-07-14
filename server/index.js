require('dotenv/config');

const express = require('express'),
      app = express(),              //instance of express, main server object
      helmet = require('helmet'),  //protect & secure headers
      morgan = require('morgan'); // log route calls

//function to make MongoDB connection, log errors and disconnects
const mongoConnect = require('./mongoConnect');

//constant vars
const PORT = process.env.PORT || 3000,
      MONGO_URI = process.env.MONGO_URI;

//attempt to make connection to MongoDb
mongoConnect(MONGO_URI)

// ROUTERS/Middleware
app.use(morgan('dev'));
app.use(helmet());

//open server to listen on a specific port
app.listen( PORT, (err) => {
    if (err) {
        return console.log(err.message || err);
    }
    console.log(`Listening on Port: ${PORT}`);
})