const Simple = require('../models/Simple');
const functions = require('../functions');
const inspect = require('util').inspect;
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
    // if ( !functions.validateFieldNotCharacterSpecial(name) || !functions.validateFieldNotCharacterSpecial(password) || !functions.validateFieldNotCharacterSpecial(birth_day) || !functions.validateFieldNotCharacterSpecial(gender) ) {
    //     errors.push ({ msg : 'The value of field only accept word : abc.., -, _' });
    // }
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
// find email
exports.findEmail = (email) => {
    return Simple.find({email : email});
}
// login verify user login
exports.isPasswordAndUserMatch = (email, password) => {
    Simple.find({ email : email })
        .then((user)=>{
            let errors = [];
            if(!user[0]){
                errors.push({ msg : 'Email not exist' });
            }else{
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
                if (hash === passwordFields[1]) {
                    return user;
                } else {
                    errors.push({ msg : 'Invalid e-mail or password' });
                }
            }
            return errors;
        });
};
// find by id for edit
exports.findById = (id) => {
    return Simple.findById(id).then( (result) => {
        delete result._id;
        delete result.__v;

        return result;
    })
}
// delete by id
exports.deleteById = (id) => {
    return new Promise( (resolve, reject) => {
        Simple.remove({id : id}, (err, simple) => {
            if (err) {
                reject(err);
            } else {
                resolve(simple);
            }
        })
    })
}