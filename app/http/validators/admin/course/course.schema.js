const Joi = require("@hapi/joi");
const createError = require("http-errors");
const {MongoIDPattern} = require("../../../../utils/constans");

const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دوره صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
    colors: Joi.array().min(0).max(20).error(createError.BadRequest("رنگ های انتخابی  نمیتواند بیشتر از 20 ایتم باشد")),
    category: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    price: Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    count: Joi.number().error(createError.BadRequest("تعداد وارد شده صحیح نمیباشد")),
    wight: Joi.number().allow(null, 0, "0").error(createError.BadRequest("وزن وارد شده صحیح نمیباشد")),
    length: Joi.number().allow(null, 0, "0").error(createError.BadRequest("طول وارد شده صحیح نمیباشد")),
    height: Joi.number().allow(null, 0, "0").error(createError.BadRequest("ارتفاع وارد شده صحیح نمیباشد")),
    width: Joi.number().allow(null, 0, "0").error(createError.BadRequest("عرض وارد شده صحیح نمیباشد")),
    type: Joi.string().regex(/(free|cash|special)/i),
    filename: Joi.string()
        .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
        .error(createError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow(),
});

const createEpisedeSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دوره صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    type: Joi.string().regex(/(lock|unlock)/i),
    ChapterID: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("شناسه فصل سحیح نمی باشد")),
    CourseID: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("شناسه دوره سحیح نمی باشد")),
    filename: Joi.string()
        .pattern(/(\.mp4|\.mpg|\.mov|\.avi|\.mkv)$/)
        .error(createError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow(),
});

module.exports = {
    createCourseSchema,
    createEpisedeSchema,
};
