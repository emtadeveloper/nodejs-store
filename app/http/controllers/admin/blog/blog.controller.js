const createHttpError = require("http-errors");
const {categoryModel} = require("../../../../models/categories");
const Controller = require("../../controller");
const {addCategorySchema, updateCategorySchema} = require("../../../validators/admin/category/category.schema");
const {default: mongoose} = require("mongoose");
const {BlogModel} = require("../../../../models/blogs");
const {CreateBlogSchema} = require("../../../validators/admin/blog/blog.schema");
const {path} = require("path");
const {deleteFileInPublic} = require("../../../../utils/function");

class CategoryController extends Controller {
    async createBlog(req, res, next) {
        try {
            const blogDataBody = CreateBlogSchema.validateAsync(req.body);
            req.body.image = path.json(blogDataBody.fileUploadPath, blogDataBody.filename).replace(/\\/gi, "/");
            req.body.image = req.body.image.replace(/\\/gi, "/");
            const {title, text, short_text, category, tags} = blogDataBody;
            const image = req.body.image;
            const blog = await BlogModel.create({title, text, short_text, category, tags, image});
            return res.json({blog});
        } catch (error) {
            deleteFileInPublic(req.body.mage);
            next(error);
        }
    }
    async getOneBlogById() {}
    async getListOfBlogs(req, res, next) {
        return res.status(200).json({
            statusCode: 200,
            data: {
                blogs: [],
            },
        });
    }
    async getCommentsOfBlog() {}
    async deleteBlogById() {}
    async updateBlogById() {}
}

module.exports = new CategoryController();
