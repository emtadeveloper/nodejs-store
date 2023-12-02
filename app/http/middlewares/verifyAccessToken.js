const createError = require("http-errors");
const {UserModel} = require("../../models/user");
const JWT = require("jsonwebtoken");
const {ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KET} = require("../../utils/constans");

function VerifyAccessToken(req, res, next) {
    const headers = req.headers;
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    if (token && ["bearer", "Bearer"].includes(bearer)) {
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) return next(createError.Unauthorized("وارد حساب کاربری خود شوید"));
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile}, {password: 0, token: 0, otp: 0});
            if (!user) next(createError.Unauthorized("حساب کاربری یافت نشد"));
            req.user = user;
            return next();
        });
    } else return next(createError.Unauthorized("وارد حساب کاربری خود شوید"));
}

module.exports = {VerifyAccessToken};
