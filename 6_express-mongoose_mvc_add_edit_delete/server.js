const express = require('express');
const bodyParser = require('body-parser');


// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use ( bodyParser.urlencoded ({ extended : true }) );

// parse requests of content-type - application/json
app.use ( bodyParser.json() );

const dbConfig = require ( './config/database.config' );
const mongoose = require ( 'mongoose' );

mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect ( dbConfig.url, {
    useNewUrlParser :true
}).then ( () => {
    console.log ( 'successfully connected to the database' );
}).catch ( err => {
    console.log ( 'could not connect to the database, exittinng now ..', err );
    process.exit ();
});

// require note routes
require ( './app/routes/note.routes' )(app);

// define a simple route
app.get ( '/', ( req, res ) => {
    res.json ({ "message" : "welcome demo mongoose" });
});

// listen for requests
app.listen ( 3000, () => {
    console.log ( "server running" );
});