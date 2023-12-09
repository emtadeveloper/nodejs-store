const createHttpError = require("http-errors");
const {categoryModel} = require("../../../../models/categories");
const Controller = require("../../controller");
const {addCategorySchema, updateCategorySchema} = require("../../../validators/admin/category/category.schema");
const {default: mongoose} = require("mongoose");
const {BlogModel} = require("../../../../models/blogs");
const {CreateBlogSchema} = require("../../../validators/admin/blog/blog.schema");

class CategoryController extends Controller {
    async createBlog(req, res, next) {
        const blogDataBody = CreateBlogSchema.validateAsync(req.body);
        return res.json(blogDataBody);
    }
}

module.exports = new CategoryController();
