const VerifyUserMiddleware = require('./middlewares/verify.user.middleware');
const AuthorizationController = require('./controllers/authorization.controller');
const AuthValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
exports.routesConfig = function (app) {

    // login 
    app.post('/auth', [
        // cần xác định là đã nhập user và password
        VerifyUserMiddleware.hasAuthValidFields,
        // kiểm tra password là khớp
        VerifyUserMiddleware.isPasswordAndUserMatch,
        // đi đến login
        AuthorizationController.login
    ]);

    app.post('/auth/refresh', [
        // xác nhận mã token có khớp hay không
        AuthValidationMiddleware.validJWTNeeded,
        // param "refresh_token" có tồn tại hay không
        AuthValidationMiddleware.verifyRefreshBodyField,
        // param refresh_token được gửi đến có hợp lệ hay không
        AuthValidationMiddleware.validRefreshNeeded,
        // đi đến login để lấy refresh token
        AuthorizationController.login
    ]);
};