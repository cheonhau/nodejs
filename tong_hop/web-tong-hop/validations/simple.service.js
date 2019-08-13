const Simple = require('../models/Simple');
const functions = require('../functions');

// validation 
exports.validationAdd = (fields) => {
    let errors = [];
    let { name, email, password, confirm_password, birth_day, note, gender } = fields;
    if ( !name || !email || !password || !confirm_password || !birth_day || !note || !gender ) {
        errors.push({ msg : 'Please enter all fields !' });
    }
    if ( password != confirm_password ) {
        errors.push({ msg : 'confirm password not matching !' });
    }
    if ( !functions.validateEmail(email) ) {
        errors.push({ msg : 'email is not valid !' });
    }
    if ( !functions.validateDate(birth_day) ) {
        errors.push({ msg : 'Your birth day is not date' });
    }
    return errors;
}
exports.validationAddImage = (mimetype) => {
    let errors = [];
    if (!functions.validateTypeImage(mimetype)) {
        errors.push({ msg : 'The Image is not file image, please check again !' });
    }
    return errors;
}
// add simple
exports.createSimple = (data) => {
    let simple = new Simple(data);
    return simple.save();
}
// hash password
exports.hashPasswordSimple = (pwd) => {
    return functions.hashPassword(pwd);
}