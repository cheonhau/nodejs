const express = require('express');
const router = express.Router();

// load validation, controller
const { ensureAuthenticated } = require('../config/auth');
const simpleController = require('../controller/simple.controller');

// list simple
router.get('/', [
    ensureAuthenticated, // đảm bảo đã login
    simpleController.simpleViewList
]);
router.get('/one', [
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