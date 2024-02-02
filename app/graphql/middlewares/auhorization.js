const createError = require("http-errors");
const {UserModel} = require("../../models/user");
const JWT = require("jsonwebtoken");
const {ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KET} = require("../../utils/constans");
const createHttpError = require("http-errors");

function getToken(headers) {
    const [bearer, token] = headers?.authorization?.split(" ") || [];
    if (token && ["bearer", "Bearer"].includes(bearer)) return token;
    throw createError.Unauthorized("حساب کاربری جهت ورود شناسایی نشد لطفا وارد حساب کاربری خود شوید");
}

// بهش پاس بدهیم res req دسترسی نداریم و فقط میتونیم متد   next  ما به متد های  GraphQL در داخل
async function VerifyAccessTokenInGraphQL(req, res) {
    try {
        const token = getToken(req.headers);
        const {mobile} = JWT.verify(token, ACCESS_TOKEN_SECRET_KEY);
        const user = await UserModel.findOne({mobile}, {password: 0, token: 0, otp: 0});
        if (!user) throw createError.Unauthorized("حساب کاربری یافت نشد");
        return user;
    } catch (error) {
        throw createError.Unauthorized();
    }
}

// ForHidden  یعنی شما به این محتوا یا آدرس نمیتونی بیای و دسترسی داشته باشی

function checkRole(role) {
    return function (req, res, next) {
        try {
            const user = req.user;
            if (user.Roles.includes(role)) return next();
            throw createError.Forbidden("شما به این قسمت دسترسی ندارید");
        } catch (error) {
            next(error);
        }
    };
}

module.exports = {getToken, VerifyAccessTokenInGraphQL, checkRole};
