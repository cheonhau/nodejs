const express = require('express');
const router = express.Router();
// Load User model, controller, validation
const { forwardAuthenticated } = require('../config/auth');
const userController = require('../controller/users.controller');
const userService = require('../services/users.service');

// Login Page
router.get('/login', [
    forwardAuthenticated, // dùng cho trường hợp chưa login
    userController.loginView
]);
router.post('/login', userController.loginUser);

// Register Page
router.get('/register', [
    forwardAuthenticated, // dùng cho trường hợp chưa login
    userController.registerView
]);
router.post('/register', [
    userService.validationRegister, // dùng để validation form register 
    userController.registerUser
]);

// Logout
router.get('/logout', userController.logOutUser);

module.exports = router;
