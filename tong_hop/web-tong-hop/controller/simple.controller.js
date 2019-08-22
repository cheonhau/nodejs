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
        totalItem = values[0]; simples = values[1];
        res.render('simples/list', {
            simples, totalItem, limit, page, current_url
        });
    }).catch(err => {
        console.log(err);
    });
    
        
    // res.render('simples/list');
}
exports.simplePostAdd = (req, res) => {
    let fields = {};
    let errors = [];
    let file_name;
    let error_file = false;
    var busboy = new Busboy({ 
        headers: req.headers,
        limits: {
            fileSize : 100*1024*1024
        } 
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        fields[fieldname] = val;
    });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        // console.log(process.env.PWD, process.cwd()); 
        // kiểm tra co dung la anh khong
        errors = simpleService.validationAddImage(mimetype);
        if ( errors.length > 0 ) {
            req.flash('error_view', errors);
            req.flash('result_view', fields);

            res.redirect('/simple'); return ;
        }
        file_name = new Date().getTime().toString() + Math.floor(Math.random() * 1000) + 1 + '.' + filename.split('.')[1];
        let path_upload = process.cwd() + '/public/images/' + file_name;
        fstream = fs.createWriteStream( path_upload );
        file.pipe(fstream);
        fstream.on('close', function () {    
        });

        file.on('data', function(data) {});
        // kiểm tra lỗi dung lượng file
        file.on('limit', function(){
            error_file = true;
            // delete file
            fs.unlink(path_upload, function () {
                errors.push({msg : 'The file no longer 1 mb.'});
            });
        });
        
        file.on('end', function() {
        });
    });
    busboy.on('finish', function() {
        // check if file no wrong limit size
        if ( !error_file ) {
            // kiểm tra field required, email ...
            errors = simpleService.validationAdd(fields);
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
            // save tới database 
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
        } else {
            if ( errors.length > 0 ) {
                req.flash('error_view', errors);
                req.flash('result_view', fields);

                res.redirect('/simple'); return ;
            }
        }
    });
    req.pipe(busboy);
}
exports.simplePostEdit = (req, res) => {
    
}
exports.simplePostDelete = (req, res) => {
    let id = req.body.id;
    simpleService.deleteById(id).then(result => {
        if (result === 'fail') {
            return res.send({'success' : 'fail'});
        }
        // delete image
        let path_image_uploaded = process.cwd() + '/public/images/' + result;
        fs.unlink(path_image_uploaded, function() {
            return res.send({'success' : 'true'});
        });
    });
}
exports.simpleGetOneInfo = (req, res) => {
    console.log(req.body, req.params);

    let id = req.body.id;
    simpleService.findById(id).then( result => {
        return res.send({simple : result});
    });
}