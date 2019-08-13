const express = require('express');
const router = express.Router();

// load validation, controller
const { ensureAuthenticated } = require('../config/auth');
const simpleController = require('../controller/simple.controller');

// use busboy to upload file
// const busboy = require('busboy');
// router.use(busboy());
// list simple
router.get('/', [
    ensureAuthenticated, // đảm bảo đã login
    simpleController.simpleViewList
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