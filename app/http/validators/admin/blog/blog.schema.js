const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const {MongoIDPattern} = require("../../../../utils/constans");

const CreateBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمی باشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    image: Joi.string()
        .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
        .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    tags: Joi.array().min(3).max(20).error(createHttpError.BadRequest("برچسب ها نمی توانند بیشتر از 20 آیتم باشند")),
    category: Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest(" دسته بندی مورد نظر یافت نشد   ")),
    fileUploadPath: Joi.allow(),
});

const updateCategory = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمی باشد")),
});

module.exports = {CreateBlogSchema, updateCategory};
