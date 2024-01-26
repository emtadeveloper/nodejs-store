const createHttpError = require("http-errors");
const Controller = require("../../controller");
const {BlogModel} = require("../../../../models/blogs");
const {CreateBlogSchema} = require("../../../validators/admin/blog/blog.schema");
const path = require("path");
const {deleteFileInPublic} = require("../../../../utils/function");
const {UserModel} = require("../../../../models/user");
const {StatusCodes: HttpStatus} = require("http-status-codes");

class UserController extends Controller {
    async getAllUsers(req, res, next) {
        try {
            const users = await UserModel.find({});
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
}

module.exports = new UserController();
