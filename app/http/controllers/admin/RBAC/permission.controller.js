const Controller = require("../../controller");
const {PermissionsModel} = require("../../../../models/permissions");
const {StatusCodes: HttpStatus} = require("http-status-codes");

class PermissionController extends Controller {
    async getAllPermissions(req, res, next) {
        try {
            const permissions = await PermissionsModel.find({});
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {permissions},
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {PermissionController: new PermissionController()};
