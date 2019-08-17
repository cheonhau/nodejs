const Busboy = require('busboy');

const fs = require('fs-extra');
const simpleService = require('../services/simple.service');
// cần làm tiếp : email không được trùng lặp và validation string nodejs
exports.simpleViewList = async (req, res) => {
    // let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let limit = 2;
    let page = 1;
    let totalItem = 0;
    let current_url = req.protocol + '://' + req.get('host') + req.baseUrl;
    let simples;
    // console.log(req.protocol, req.get('host'), req.originalUrl, req.headers.host, req.baseUrl, req.path, current_url);
    // get current page
    if (req.query && req.query.page) {
        req.query.page = parseInt(req.query.page);
        page = Number.isInteger(req.query.page) ? req.query.page : 1;
    }
    // total number list
    totalItem = simpleService.countList();
    simples = simpleService.getList(limit, page);

    await Promise.all([totalItem, simples]).then( (values) => {
        totalItem = values[0];
        res.render('simples/list', {
            simples, totalItem, limit, page, current_url
        });
        console.log('xong');
    });
    
        
    // res.render('simples/list');
}
exports.simplePostAdd = (req, res) => {
    let fields = {};
    let errors = [];
    let filenameUpload;
    let fileUpload;
    let mimetypeUpload;
    var busboy = new Busboy({ 
        headers: req.headers,
        limits: {
            fileSize : 1*1024*1024
        } 
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        fields[fieldname] = val;
    });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        fileUpload = file;
        mimetypeUpload = mimetype;
        filenameUpload = filename;

        file.on('data', function(data) {});
        file.on('limit', function(){
            errors.push({msg : 'The file no longer 1 mb.'});
        });
    });
    busboy.on('finish', function() {
        // kiểm tra lỗi dung lượng file
        if ( errors.length > 0 ) {
            req.flash('error_view', errors);
            req.flash('result_view', fields);

            res.redirect('/simple'); return ;
        }
        // kiểm tra field required, email ...
        errors = simpleService.validationAdd(fields);
        if ( errors.length > 0 ) {
            req.flash('error_view', errors);
            req.flash('result_view', fields);

            res.redirect('/simple'); return ;
        }
        // kiểm tra co dung la anh khong
        errors = simpleService.validationAddImage(mimetypeUpload);
        if ( errors.length > 0 ) {
            req.flash('error_view', errors);
            req.flash('result_view', fields);

            res.redirect('/simple'); return ;
        }
        // validate email không bị trùng 
        simpleService.findEmail(fields.email).then( (result) => {
            if (result.length > 0) {
                errors.push({ msg : 'The Email has already, please check again !' });
                req.flash('error_view', errors);
                req.flash('result_view', fields);

                res.redirect('/simple'); return ;
            }
        });
        // console.log(process.env.PWD, process.cwd()); upload ảnh và save tới database 
        file_name = new Date().getTime().toString() + Math.floor(Math.random() * 1000) + 1 + '.' + filenameUpload.split('.')[1];
        fstream = fs.createWriteStream( process.cwd() + '/public/images/' + file_name);
        fileUpload.pipe(fstream);
        fstream.on('close', function () {    
            fields['image'] = file_name; 
            fields['password'] = simpleService.hashPasswordSimple( fields.password );
            simpleService.createSimple(fields)
                .then( (result) => {
                    req.flash(
                        'success_msg',
                        'You are save data successfully !'
                    );
                    res.redirect('/simple');
                })
                .catch( err => {
                    console.log(err);
                    res.redirect('/simple');
                });
        });
    });
    req.pipe(busboy);
}
exports.simplePostEdit = (req, res) => {
    
}