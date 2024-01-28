const createHttpError = require("http-errors");
const Controller = require("../../controller");
const {BlogModel} = require("../../../../models/blogs");
const {CreateBlogSchema} = require("../../../validators/admin/blog/blog.schema");
const path = require("path");
const {deleteFileInPublic, deleteInvalidPropertyObject} = require("../../../../utils/function");
const {UserModel} = require("../../../../models/user");
const {StatusCodes: HttpStatus} = require("http-status-codes");

class UserController extends Controller {
    async getAllUsers(req, res, next) {
        try {
            const {search} = req.params;
            const databaseQuery = {};
            if (search) databaseQuery["$text"] = {$search: search};
            const users = await UserModel.find(databaseQuery);
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    users,
                },
            });
        } catch (error) {
            next(error);
        }
    }
    async updateUserProfile(req, res, next) {
        try {
            const userID = req.user._id;
            const data = req.body;
            const BlackListFileds = ["mobile", "otp", "bills", "discount", "Role", "Courses"];
            deleteInvalidPropertyObject(data, BlackListFileds);
            const profileUpdateResult = await UserModel.updateOne({_id: userID}, {$set: data});
            if (!profileUpdateResult.modifiedCount) throw new createHttpError.InternalServerError("به روز رسانی انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {message: "به روز رسانی پروفایل با موفقیت انجام شد"},
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
