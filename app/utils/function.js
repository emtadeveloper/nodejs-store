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
            console.log(token, "token");
            if (err) reject(createHttpError.InternalServerError("خطای سرور"));
            resolve(token);
        });
    });
}

function SignRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {mobile: user.mobile, userID: user._id};
        const options = {expiresIn: "1y"};
        JWT.verify(payload, REFRESH_TOKEN_SECRET_KET, options, (err, token) => {
            if (err) reject(createHttpError.InternalServerError("خطای سرور"));
            resolve(token);
        });
    });
}

module.exports = {numberRandomGenerator, SignAccessToken, SignRefreshToken};
