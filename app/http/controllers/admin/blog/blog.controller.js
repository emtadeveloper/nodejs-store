const createHttpError = require("http-errors");
const Controller = require("../../controller");
const {BlogModel} = require("../../../../models/blogs");
const {CreateBlogSchema} = require("../../../validators/admin/blog/blog.schema");
const path = require("path");
const {deleteFileInPublic} = require("../../../../utils/function");

class CategoryController extends Controller {
    //
    async createBlog(req, res, next) {
        try {
            const blogDataBody = await CreateBlogSchema.validateAsync(req.body);
            console.log(blogDataBody, "blogDataBody");
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename).replace(/\\/gi, "/");
            req.body.image = req.body.image.replace(/\\/gi, "/");
            const {title, text, short_text, category, tags} = blogDataBody;
            const image = req.body.image;
            const author = req.user._id;
            const blog = await BlogModel.create({title, text, short_text, category, tags, image, author});
            return res.status(201).json({
                data: {
                    statusCode: 201,
                    message: "ایجاد بلاگ با موفقیت انجام شد",
                },
            });
        } catch (error) {
            req.body.image = path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/gi, "/");
            console.log(req.body.image);
            deleteFileInPublic(req.body.image);
            next(error);
        }
    }

    async getListOfBlogs(req, res, next) {
        try {
            const blogs = await BlogModel.aggregate([
                {$match: {}},
                {$lookup: {from: "users", foreignField: "_id", localField: "author", as: "author"}},
                {$unwind: "$author"},
                {
                    $project: {
                        "author.__v": 0,
                        "author.opt": 0,
                        "author.Roles": 0,
                        "author.discount": 0,
                        "author.bills": 0,
                    },
                },
                {
                    $lookup: {
                        from: "categories",
                        foreignField: "_id",
                        localField: "category",
                        as: "category",
                    },
                },
                {
                    $unwind: "$category",
                },
                {
                    $project: {
                        "author.__v": 0,
                        "category.__v": 0,
                        "author.otp": 0,
                        "author.Roles": 0,
                        "author.discount": 0,
                        "author.bills": 0,
                    },
                },
            ]);
            return res.status(201).json({
                data: {
                    statusCode: 201,
                    blogs,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async getOneBlogById() {}
    async getCommentsOfBlog() {}
    async deleteBlogById() {}
    async updateBlogById() {}
}

module.exports = new CategoryController();
