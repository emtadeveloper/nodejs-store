const createHttpError = require("http-errors");
const {categoryModel} = require("../../../../models/categories");
const Controller = require("../../controller");
const {addCategorySchema} = require("../../../validators/admin/category/category.schema");
const {default: mongoose} = require("mongoose");

class CategoryController extends Controller {
    async checkExitCategory(id) {
        const category = await categoryModel.findById(id);
        if (!category) throw createHttpError.NotFound("دسته بندی یافت نشد");
        return category;
    }

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

    async getAllParents(req, res, next) {
        try {
            const parents = await categoryModel.find({parent: undefined});
            return res.status(200).json({statusCode: 200, data: parents});
        } catch (error) {
            next(error);
        }
    }

    async getChildOfParents(req, res, next) {
        try {
            const {parent} = req.params;
            const childern = await categoryModel.find({parent}, {__v: 0, parent: 0});

            return res.status(200).json({statusCode: 200, data: childern});
        } catch (error) {
            next(error);
        }
    }

    async getAllCategory(req, res, next) {
        try {
            const category = await categoryModel.aggregate([
                {
                    // $lookup: {
                    //     // from: "categories",
                    //     // localField: "_id",
                    //     // foreignField: "parent",
                    //     // as: "children",
                    // },

                    $graphLookup: {
                        from: "categories",
                        startWith: "$_id",
                        connectFromField: "_id",
                        connectToField: "parent",
                        maxDepth: 5,
                        depthField: "depth",
                        as: "children",
                    },
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0,
                    },
                },
                {
                    $match: {
                        parent: undefined,
                    },
                },
            ]);
            return res.status(200).json({statusCode: 200, data: category});
        } catch (error) {
            next(error);
        }
    }

    async getCategoryById(req, res, next) {
        try {
            const {id: _id} = req.params;
            const category = await categoryModel.aggregate([
                {
                    $match: {_id:new mongoose.Types.ObjectId(_id)},
                },
                {
                    $graphLookup: {
                        from: "categories",
                        startWith: "$_id",
                        connectFromField: "_id",
                        connectToField: "parent",
                        maxDepth: 5,
                        depthField: "depth",
                        as: "children",
                    },
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0,
                    },
                },
            ]);
            return res.status(200).json({statusCode: 200, data: category});
        } catch (error) {
            next(error);
        }
    }

    async removeCategory(req, res, next) {
        try {
            const {id} = req.params;
            const category = await this.checkExitCategory(id);
            const deleteResult = await categoryModel.deleteOne({
                $or: [{_id: category._id}, {parent: category._id}],
            });
            if (deleteResult.deletedCount === 0) throw createHttpError.InternalServerError("حذف دسته بندی انجام نشد");
            return res.status(200).json({data: {statusCode: 200, message: "حذف دسته بندی با موفقیت انجام شد"}});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();
