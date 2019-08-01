const UsersController = require('../users/controllers/users.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
// ở đây có thể tạo nhiều validationMiddleware
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    /* Start user api */

    // insert một user, trong trường hợp này không validate
    app.post('/users', [
        ValidationMiddleware.validationCreateUser,
        UsersController.insert
    ]);
    // lấy ra danh sách user
    app.get('/users', [
        // xác nhận mã token có khớp hay không
        ValidationMiddleware.validJWTNeeded,
        // kiểm tra đặc quyền của người này, thuật toán này dựa vào thuật toán &, tính bit của số, 7 có bit là 1,2,4 là toàn quyền đấy
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.list
    ]);
    // xem thông tin một user
    app.get('/users/:userId', [
        // xác nhận mã token có khớp hay không
        ValidationMiddleware.validJWTNeeded,
        // kiểm tra đặc quyền của người này, thuật toán này dựa vào thuật toán &, tính bit của số, 7 có bit là 1,2,4 là toàn quyền đấy
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // chỉ có user đó hoặc admin mới có quyền chỉnh sửa thông tin user
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);
    // edit một user
    app.patch('/users/:userId', [
        // xác nhận mã token có khớp hay không
        ValidationMiddleware.validJWTNeeded,
        // kiểm tra đặc quyền của người này, thuật toán này dựa vào thuật toán &, tính bit của số, 7 có bit là 1,2,4 là toàn quyền đấy
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // chỉ có user đó hoặc admin mới có quyền chỉnh sửa thông tin user
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById
    ]);
    // xóa một user
    app.delete('/users/:userId', [
        // xác nhận mã token có khớp hay không
        ValidationMiddleware.validJWTNeeded,
        // kiểm tra đặc quyền của người này, thuật toán này dựa vào thuật toán &, tính bit của số, 7 có bit là 1,2,4 là toàn quyền đấy
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);

    /* End user api */
};