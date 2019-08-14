const User = require('../models/User');
exports.validationRegister = (req, res, next) => {
    if ( req.body.constructor === Object && Object.keys(req.body).length === 0 ) {
        res.render('register');
    } else {
        let errors = [];
        const { name, email, password, password2 } = req.body;
        if (!name || !email || !password || !password2) {
            errors.push({ msg: 'Please enter all fields' });
        }

        if (password != password2) {
            errors.push({ msg: 'Passwords do not match' });
        }

        if (password.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters' });
        }
        if (errors.length > 0) {
            res.render('register', {
            errors,
            name,
            email,
            password,
            password2
            });
        }
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({msg : "Email already exists"});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                return next();
            }
        })
        
    }
}