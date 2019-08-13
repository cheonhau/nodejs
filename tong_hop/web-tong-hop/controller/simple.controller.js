var http = require('http'),
    inspect = require('util').inspect;

var Busboy = require('busboy');

const fs = require('fs-extra');
const simpleService = require('../validations/simple.service');

exports.simpleViewList = (req, res) => {
    res.render('simples/list');
}
exports.simplePostAdd = (req, res) => {
    var busboy = new Busboy({ 
        headers: req.headers,
        limits: {
            fileSize : 1*1024*1024
        } 
    });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('limit', function(){
        console.log('file size over 1 MB.');
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
      console.log('Done parsing form!');
      res.redirect('/simple');
    });
    req.pipe(busboy);


    // // req.pipe(req.busboy);
    // let fields = {};
    // let filenameUpload;
    // let fileUpload;
    // let mimetypeUpload;
    // busboy.on('field', function(fieldname, val) {
    //     // fields[fieldname] = val;
    //     console.log(fieldname, ':', val);
    // });
    // // busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    // //     // fileUpload = file;
    // //     // mimetypeUpload = mimetype;
    // //     // filenameUpload = filename;
        
                
    // // });
    // busboy.on('finish', () => {
    //     res.redirect('/simple');
    //     // let errors = [];
    //     // errors = simpleService.validationAdd(fields);
    //     // if ( errors.length > 0 ) {
    //     //     console.log(fields, ':line 24');
    //     //     req.flash('error_view', errors);
    //     //     req.flash('result_view', fields);

    //     //     res.redirect('/simple'); return ;
    //     // }
    //     // errors = simpleService.validationAddImage(mimetypeUpload);
    //     // if ( errors.length > 0 ) {
    //     //     req.flash('error_view', errors);
    //     //     req.flash('result_view', fields);

    //     //     res.redirect('/simple'); return ;
    //     // }
    //     // // upload file '/images/'
    //     // // console.log(process.env.PWD, process.cwd());
    //     // file_name = new Date().getTime().toString() + Math.floor(Math.random() * 1000) + 1 + '.' + filenameUpload.split('.')[1];
    //     // fstream = fs.createWriteStream( process.cwd() + '/public/images/' + file_name);
    //     // fileUpload.pipe(fstream);
    //     // fstream.on('close', function () {    
    //     //     fields['image'] = file_name; 
    //     //     fields['password'] = simpleService.hashPasswordSimple( fields.password );
    //     //     simpleService.createSimple(fields)
    //     //         .then( (result) => {
    //     //             console.log(result);
    //     //             res.redirect('/simple');
    //     //         })
    //     //         .catch( err => {
    //     //             console.log(err);
    //     //             res.redirect('/simple');
    //     //         });
    //     // });
    // });
}
exports.simplePostEdit = (req, res) => {
    
}