const createError = require("http-errors");
const {UserModel} = require("../../models/user");
const JWT = require("jsonwebtoken");
const {ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KET} = require("../../utils/constans");

function getToken(headers) {
    const [bearer, token] = headers?.authorization?.split(" ") || [];
    if (token && ["bearer", "Bearer"].includes(bearer)) return token;
    throw createError.Unauthorized("حساب کاربری جهت ورود شناسایی نشد لطفا وارد حساب کاربری خود شوید");
}

function VerifyAccessToken(req, res, next) {
    try {
        const token = getToken(req.headers);
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            console.log(err,'err')
            if (err) throw createError.Unauthorized("وارد حساب کاربری خود شوید");
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile}, {password: 0, token: 0, otp: 0});
            if (!user) throw createError.Unauthorized("حساب کاربری یافت نشد");
            req.user = user;
            return next();
        });
    } catch (error) {
        next(error);
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

module.exports = {VerifyAccessToken, checkRole};
