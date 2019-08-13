const crypto = require('crypto');

// use !functions.validateEmail(email)->is not valid;
exports.validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// format yyyy-mm-dd
exports.validateDate = (dateString) => {
    // First check for the pattern
    // if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) mm/dd/yyyy
    console.log(dateString);
    if(!/^\d{4}\-\d{2}\-\d{2}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);
    console.log(day, month, year);
    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}
// validate number
exports.validateNumber = (string) => {
    if ( isNaN( string )) return false;
    return true;
}
// validate image, fileType : this.files[0]['type'] : 
exports.validateTypeImage = (fileType) => {
    let validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(fileType)) {
        return false;
    }
    return true;
}
// create name file from filename
exports.createNameFileFromNameFile = (nameFile) => {
    var array_name_file = nameFile.split('.');
    return new Date().getTime().toString() + '-' + Math.floor(Math.random() * 1000) + 1 + '.' + array_name_file[1];
}
// hash password
exports.hashPassword = (password) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    
    return salt + "$" + hash;
}