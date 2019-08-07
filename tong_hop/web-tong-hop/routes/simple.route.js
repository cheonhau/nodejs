const express = require('express');
const router = express.Router();

// csrf security view
const csrf = require('csurf');
// setup route middlewares
const csrfProtection = csrf({ cookie: true });

// load validation, controller
const { ensureAuthenticated } = require('../config/auth');
const simpleController = require('../controller/simple.controller');

// list simple
router.get('/', [
    ensureAuthenticated, // đảm bảo đã login
    csrfProtection,
    simpleController.simpleViewList
]);
router.get('/add', [
    ensureAuthenticated, // 
    simpleController.simpleViewAdd
]);
router.get('/edit', [
    ensureAuthenticated, //
    simpleController.simpleViewEdit
]);
router.post('/add', [
    ensureAuthenticated,
    simpleController.simplePostAdd
]);
router.post('/edit', [
    ensureAuthenticated,
    simpleController.simplePostEdit
]);

module.exports = router;