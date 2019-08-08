// const Simple = require('../models/simple');

exports.validationAdd = (req, res, next) => {
    req.pipe(req.busboy);
    let fields = {};

    req.busboy.on('field', function(fieldname, val) {
        fields[fieldname] = val;
    });
    // req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    //     console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        
    // });
    req.busboy.on('finish', () => {
        let { name, email, password, confirm_password, birthDay, note, image, gender } = fields;
        console.log(name);
    });
    if ( req.body.constructor === Object && Object.keys(req.body).length === 0 ) {
        console.log('vao day');
        req.flash('error_msg', 'co mot cai loi<br> ai da tao ra cai loi <br>');
        res.redirect('/simple');
    } else {
        console.log('hihi');
        let errors = [];
        const { name, email, password, confirm_password, birthDay, note, image, gender } = req.body;
        if ( !name || !email || !password || !confirm_password || !birthDay || !note || !image || !gender ) {
            errors.push('Please enter all fields !');
        } 
        if ( !validateEmail( email ) ) {
            errors.push('The Email is not valid !');
        }
        console.log(errors);
        if (errors.length > 0) {
            res.render('simples/list', {
                errors,
                name, 
                email, 
                password, 
                confirm_password, 
                birthDay, 
                note, 
                image, 
                gender
            })
        }
        res.render('simples/list');
    }
    console.log('aka');
}
exports.validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}