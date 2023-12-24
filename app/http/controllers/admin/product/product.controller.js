const createHttpError = require("http-errors");
const Controller = require("../../controller");
const {BlogModel} = require("../../../../models/blogs");
const {CreateBlogSchema} = require("../../../validators/admin/blog/blog.schema");
const path = require("path");
const {deleteFileInPublic} = require("../../../../utils/function");

class ProductController extends Controller {
    addProduct(){}
}

module.exports = new ProductController();
