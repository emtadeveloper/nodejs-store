const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const {MongoIDPattern} = require("../../../../utils/constans");

const addRoleSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان نقش  صحیح نمیباشد")),
    permissions: Joi.array().items(Joi.string().pattern(MongoIDPattern).error(new Error("دسترسی های ارسال شده صحیح نمی باشد"))),
});

const addPermissionSchema = Joi.object({
    name: Joi.string().min(3).max(30).error(createHttpError.BadRequest(" اسم دسترسی  صحیح نمیباشد")),
    description: Joi.string().min(0).max(100).error(new Error("توضیحات دسترسی صحیح نمی باشد")),
});

module.exports = {addRoleSchema, addPermissionSchema};
