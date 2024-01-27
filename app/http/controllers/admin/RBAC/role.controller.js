const Controller = require("../../controller");
const {RoleModel} = require("../../../../models/role");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const createHttpError = require("http-errors");
const {addRoleSchema} = require("../../../validators/admin/RBAC/RBAC.schema");

class RoleController extends Controller {
    async getAllRoles(req, res, next) {
        try {
            const roles = await RoleModel.find({});
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {roles},
            });
        } catch (error) {
            next(error);
        }
    }

    async createNewRole(req, res, next) {
        try {
            console.log("init");
            const {title, permissions} = await addRoleSchema.validateAsync(req.body);
            await this.findRoleWithTitle(req.body);
            const role = await RoleModel.create({title, permissions});
            if (!role) throw createHttpError.InternalServerError("نقش ایجاد نشد");
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {message: "نقش با موفقیت ایجاد نشد"},
            });
        } catch (error) {
            next(error);
        }
    }

    async findRoleWithTitle(title) {
        const role = await RoleModel.findOne({title});
        if (role) throw createHttpError.BadRequest("نقش یا رول قبلا ثبت شده است");
    }
}

module.exports = {RoleController: new RoleController()};
