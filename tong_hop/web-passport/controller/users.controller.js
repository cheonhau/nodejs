const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.loginView = (req, res) => {
    res.render('login');
};
exports.registerView = (req, res) => {
    res.render('register');
};
exports.registerUser = (req, res) => {
    const { name, email, password, password2 } = req.body;
    const newUser = new User({
        name,
        email,
        password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
            .save()
            .then(user => {
                req.flash(
                'success_msg',
                'You are now registered and can log in'
                );
                res.redirect('/users/login');
            })
            .catch(err => console.log(err));
        });
    });
}
exports.loginUser = (req, res, next) => {
    passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
    })(req, res, next);
}
exports.logOutUser = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
}