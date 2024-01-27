const Controller = require("../../controller");
const {PermissionsModel} = require("../../../../models/permissions");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const {addPermissionSchema} = require("../../../validators/admin/RBAC/RBAC.schema");

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

    async createNewPermission(req, res, next) {
        try {
            const {title, description} = await addPermissionSchema.validateAsync(req.body);
            await this.findPermissionWithName(req.body);
            const permissions = await PermissionsModel.create({title, description});
            if (!permissions) throw createHttpError.InternalServerError("سطح دسترسی ایجاد نشد");
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {message: "سطح دسترسی  با موفقیت ایجاد نشد"},
            });
        } catch (error) {
            next(error);
        }
    }

    async findPermissionWithName(name) {
        const role = await PermissionsModel.findOne({name});
        if (role) throw createHttpError.BadRequest("سطح دسترسی  قبلا ثبت شده است");
    }
}

module.exports = {PermissionController: new PermissionController()};
