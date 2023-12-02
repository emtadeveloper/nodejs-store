const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const {UserModel} = require("../models/user");
const {ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KET} = require("./constans");

function numberRandomGenerator() {
    return Math.floor(Math.random() * 90000 + 10000);
}

function SignAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {mobile: user.mobile, userID: user._id};
        const options = {expiresIn: "1h"};
        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            // if (err) reject(createHttpError.InternalServerError("خطای سرور"));
            resolve(token);
        });
    });
}

function SignRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);
        console.log(user, " user ");
        const payload = {mobile: user.mobile, userID: user._id};
        const options = {expiresIn: "1y"};
        JWT.sign(payload, REFRESH_TOKEN_SECRET_KET, options, (err, token) => {
            // if (err) reject(createHttpError.InternalServerError("خطای سرور"));
            resolve(token);
        });
    });
}

function VerifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        JWT.verify(token, REFRESH_TOKEN_SECRET_KET, async (err, payload) => {
            if (err) reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile}, {password: 0, token: 0, otp: 0});
            if (!user) next(createError.Unauthorized("حساب کاربری یافت نشد"));
            console.log(mobile, "mobile");
            resolve(mobile);
        });
    });
}

module.exports = {numberRandomGenerator, SignAccessToken, SignRefreshToken, VerifyRefreshToken};
