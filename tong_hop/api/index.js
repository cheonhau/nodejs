const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();
// config database
const mongoose = require('mongoose');
mongoose.connect ( config.URI_DB, {
    useNewUrlParser :true
}).then ( () => {
    console.log ( 'successfully connected to the database' );
}).catch ( err => {
    console.log ( 'could not connect to the database, exittinng now ..', err );
    process.exit ();
});
// dùng để nhận get, post gửi về 
const bodyParser = require('body-parser');
// dùng để login và refresh token 
const AuthorizationRouter = require('./authorization/routes.config');
// sử dụng cho các mục đích create, edit ...
const UsersRouter = require('./router/routes.config');// middleware ở folder common

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});