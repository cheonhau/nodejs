const express = require('express');
const router = express.Router();

// load validation, controller
const { ensureAuthenticated } = require('../config/auth');
const simpleController = require('../controller/simple.controller');

var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require('body-parser')

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })
var app = express()

// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())

// list simple
router.get('/', [
    csrfProtection,
    ensureAuthenticated, // đảm bảo đã login
    simpleController.simpleViewList
]);
router.post('/one', [
    simpleController.simpleGetOneInfo
]);
router.post('/add', [
    ensureAuthenticated,
    simpleController.simplePostAdd
]);
router.post('/edit', [
    ensureAuthenticated,
    simpleController.simplePostEdit
]);
router.post('/delete', [
    ensureAuthenticated,
    simpleController.simplePostDelete
]);

module.exports = router;