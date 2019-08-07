const Simple = require('../models/simple');

exports.validationAdd = (req, res, next) => {
    if ( req.body.constructor === Object && Object.keys(req.body).length === 0 ) {
        res.render('simple');
    } else {
        let errors = [];
        const { name, email, password, confirm_password, birthDay, note, image, gender } = req.body;

        if (errors.length) {
            res.render('simple', {
                errors,
                name, 
                email, 
                password, 
                confirm_password, 
                birthDay, note, 
                image, 
                gender
            })
        }
    }
}