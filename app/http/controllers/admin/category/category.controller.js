const createHttpError = require("http-errors");
const {categoryModel} = require("../../../../models/categories");
const Controller = require("../../controller");
const {addCategorySchema} = require("../../../validators/admin/category/category.schema");

class CategoryController extends Controller {
    async addCategory(req, res, next) {
        try {
            console.log(req.body, "req.body");
            await addCategorySchema.validateAsync(req.body);
            const {title, parent} = req.body;
            const category = await categoryModel.create({title, parent});
            if (!category) throw createHttpError.InternalServerError("خطای داخلی");
            return res.status(201).json({data: {statusCode: 201, message: "دسته بندی با موفقیت افزوده شده"}});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();
