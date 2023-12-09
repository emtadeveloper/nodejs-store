const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const {MongoIDPattern} = require("../../../../utils/constans");

const CreateBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمی باشد")),
    text: Joi.string().error(new Error("متن ارسال شده صحیح نمی باشد")),
    short_text: Joi.string().error(new Error("متن ارسال شده صحیح نمی باشد")),
    image: Joi.string().error(new Error("تصویر ارسال شده صحیح نمی باشد")),
    tags: Joi.array().min(3).max(20).error(new Error("برچسب ها نمی توانند بیشتر از 20 آیتم باشند")),
    category: Joi.string().pattern(MongoIDPattern).error(new Error(" دسته بندی مورد نظر یافت نشد   ")),
});

const updateCategory = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمی باشد")),
});

module.exports = {CreateBlogSchema, updateCategory};
