const Simple = require('../models/Simple');
const bcrypt = require('bcryptjs');

exports.simpleViewList = (req, res) => {
    console.log( req.csrfToken() );
    res.render('simples/list', { csrfToken: req.csrfToken() });
}
exports.simpleViewAdd = (req, res) => {
    res.render('simples/add');
}
exports.simpleViewEdit = (req, res) => {
    res.render('simples/edit');
}