const Controller = require("../../controller");
const {RoleModel} = require("../../../../models/role");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const createHttpError = require("http-errors");
const {addRoleSchema} = require("../../../validators/admin/RBAC/RBAC.schema");
const {default: mongoose} = require("mongoose");
const {copyObject, deleteInvalidPropertyInObject} = require("../../../../utils/function");
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
            const {title, permissions, description} = await addRoleSchema.validateAsync(req.body);
            console.log(title, permissions, description);
            await this.findRoleWithTitle(title);
            const role = await RoleModel.create({title, permissions, description});
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

    async removeRole(req, res, next) {
        try {
            const {field} = req.params;
            const role = await this.findRoleWithIdOrTitle(field);
            const removeRoleResult = await RoleModel.deleteOne({_id: role._id});
            if (!removeRoleResult.deletedCount) throw createHttpError.InternalServerError("حذف نقش انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "حذف نقش با موفقیت انجام شد",
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async findRoleWithIdOrTitle(field) {
        let findQuery = mongoose.isValidObjectId(field) ? {_id: field} : {title: field};
        const role = await RoleModel.findOne(findQuery);
        if (!role) throw createHttpError.NotFound("نقش مورد نظر یافت نشد");
        return role;
    }

    async updateRoleByID(req, res, next) {
        try {
            const {id} = req.params;
            const role = await this.findRoleWithIdOrTitle(id);
            const data = copyObject(req.body);
            deleteInvalidPropertyInObject(data, []);
            const updateRoleResult = await RoleModel.updateOne(
                {_id: role._id},
                {
                    $set: data,
                },
            );
            if (!updateRoleResult.modifiedCount) throw createHttpError.InternalServerError("ویرایش نقش انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "ویرایش نقش با موفقیت انجام شد",
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {RoleController: new RoleController()};
