const Simple = require('../models/Simple');
const functions = require('../functions');
const inspect = require('util').inspect;
const fs = require('fs-extra');
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
exports.validationEdit = (fields) => {
    let errors = [];
    let { name, email, birth_day, note, gender } = fields;
    if ( !name || !email || !birth_day || !note || !gender ) {
        errors.push({ msg : 'Please enter all fields !' });
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
// find email
exports.findEmail = (email) => {
    return Simple.find({email : email});
}
// find email edit
exports.findEmailEdit = async (id, email) => {
    try {
        let email_old = (await Simple.findOne({_id : id})).email;
        let count_email = await Simple.countDocuments({email : email});
        if ( (email == email_old && count_email > 1) || (email != email_old && count_email >= 1) ) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
    }
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
exports.findById = async (id) => {
    try {
        let simple = await Simple.findById(id);
        return simple;
    } catch (error) {
        console.log(error);
    }
}
// edit by id
exports.patchSimple = (id, simpleData) => {
    return new Promise( (resolve, reject) => {
        Simple.findById(id, function (err, simple) {
            if (err) reject(err);
            for (let i in simpleData) {
                simple[i] = simpleData[i];
            }
            simple.save(function(err, updateSimple){
                if (err) reject(err);
                resolve(updateSimple);
            });
        });
    });
}
//get lish simple : page -> hiện tại số trang là bao nhiêu, min = 1, perpage -> số lượng item trên mỗi trang 
exports.getList = async (perpage, page) => {
    try {
        let simple = await Simple.find()
                .limit(perpage)
                .skip( perpage * (page -1) )
                .exec();
        return simple;
    } catch (error) {
        console.log(error);
    }
}
// get list count 
exports.countList = async () => {
    try {
        let count = await Simple.countDocuments({});
        return count;   
    } catch (error) {
        console.log(error);
    }
}
// delete by id
exports.deleteById = async (id) => {
    try {
        let simple = await Simple.findOne({_id : id});
        let image = simple.image;
        let result = await Simple.deleteOne({_id : id});
        // let result = await simple.remove().exec();
        if (result.ok === 1) {
            return image;
        }
        return 'fail';
    } catch (error) {
        console.log(error);
    }
}
// xóa ảnh khi edit thay ảnh mới
exports.removeImage = async (id) => {
    try {
        let image = (await Simple.findOne({_id : id})).image;
        let path_upload = process.cwd() + '/public/images/' + image;
        fs.unlink(path_upload);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}