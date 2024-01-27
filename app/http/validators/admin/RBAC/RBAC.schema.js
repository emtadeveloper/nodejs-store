const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const {MongoIDPattern} = require("../../../../utils/constans");

const addRoleSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان نقش  صحیح نمیباشد")),
    permissions: Joi.array().items(Joi.string().pattern(MongoIDPattern).error(new Error("دسترسی های ارسال شده صحیح نمی باشد"))),
});

module.exports = {addRoleSchema};
