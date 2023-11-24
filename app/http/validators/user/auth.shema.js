const Joi = require("@hapi/joi");

const authShema = Joi.object({
    // email: Joi.string().trim().lowercase().required().error(new Error("ایمیل وارد شده صحیح نمی باشد")),
    // password: Joi.string().min(6).max(16).trim().required(new Error("پسورد وارد شده باید بین 6 الی 16 کاراکتر باشد")),
    mobile: Joi.string()
        .length(11)
        .pattern(/^09[0-9]{9}$/)
        .error(new Error("شماره موبایل وارد شده صحیح نمی باشد")),
});
module.exports = {authShema};
