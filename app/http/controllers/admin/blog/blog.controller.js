const createHttpError = require("http-errors");
const Controller = require("../../controller");
const {BlogModel} = require("../../../../models/blogs");
const {CreateBlogSchema} = require("../../../validators/admin/blog/blog.schema");
const path = require("path");
const {deleteFileInPublic} = require("../../../../utils/function");

class CategoryController extends Controller {
    //
    async findBlog(query) {
        const blog = await BlogModel.findOne(query).populate([
            {path: "category", select: {title: 1}},
            {path: "author", select: ["mobile", "username", "last_name", "first_name"]},
        ]);
        if (!blog) throw createHttpError.NotFound("مقاله ای یاقت نشد");
        delete blog.category.children;
        return blog;
    }

    async createBlog(req, res, next) {
        try {
            const blogDataBody = await CreateBlogSchema.validateAsync(req.body);
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

    async getOneBlogById(req, res, next) {
        try {
            const {id} = req.params;
            const blog = await this.findBlog({_id: id});
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    blog,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteBlogById(req, res, next) {
        try {
            const {id} = req.params;
            await this.findBlog(id);
            const result = await BlogModel.deleteOne({_id: id});
            if (result.deletedCount === 0) throw createHttpError.InternalServerError("حذف انجام شد");
            return res.status(200).join({
                data: {
                    statusCode: 200,
                    message: "حذف مقاله با موفقیت اتجام شد",
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async updateBlogById(req, res, next) {
        try {
            const {id} = req.params;
            await this.findBlog(id);
            if (req?.body?.fileUploadPath && req?.body?.filename) {
                req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
                req.body.image = req.body.image.replace(/\\/g, "/");
            }
            const data = req.body;
            let nullishData = ["", " ", "0", 0, null, undefined];
            let blackListFields = ["bookmarks", "deslikes", "comments", "likes", "author"];
            Object.keys(data).forEach(key => {
                if (blackListFields.includes(key)) delete data[key];
                if (typeof data[key] == "string") data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
                if (nullishData.includes(data[key])) delete data[key];
            });
            const updateResult = await BlogModel.updateOne({_id: id}, {$set: data});
            if (updateResult.modifiedCount == 0) throw createError.InternalServerError("به روز رسانی انجام نشد");

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "به روز رسانی بلاگ با موفقیت انجام شد",
                },
            });
        } catch (error) {
            deleteFileInPublic(req?.body?.image);
            next(error);
        }
    }

    async getCommentsOfBlog() {}
}

module.exports = new CategoryController();
