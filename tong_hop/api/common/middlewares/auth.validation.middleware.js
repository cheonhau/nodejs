// file này chủ yếu sử dụng để refrésh token 
const jwt = require('jsonwebtoken'),
    secret = require('../config/env.config.js').jwt_secret,
    crypto = require('crypto'),
    UserModel = require('../../users/models/users.model');

// param "refresh_token" có tồn tại hay không
exports.verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
};
// param refresh_token được gửi đến có hợp lệ hay không
exports.validRefreshNeeded = (req, res, next) => {
    let b = new Buffer.from(req.body.refresh_token, 'base64');
    let refresh_token = b.toString();
    // req.jwt.refreshKey có giá trị là mã token được lấy từ param refresh_token có dạng "Bearer xyzabc123"
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64");
    if (hash === refresh_token) {
        // gán req.body có giá trị là mã token
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({error: 'Invalid refresh token'});
    }
};

// xác nhận mã token có khớp hay không
exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};
exports.validationCreateUser = (req, res, next) => {
    let errors = [];

    if(req.body) {
        if(!req.body.email){
            errors.push("Missing email field");
        }
        if(!req.body.password){
            errors.push("Missing password field");
        }
        if(errors.length){
            return res.status(400).send({errors : errors.join(',')});
        }
        UserModel.findByEmail(req.body.email).then((user) => {
            if (user.length){
                return res.status(400).send({errors : "Email already exists"});
            } else {
                return next();
            }
        });
    }else{
        return res.status(400).send({errors : "Missing email and password field"})
    }
}