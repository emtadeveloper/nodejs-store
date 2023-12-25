const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const {UserModel} = require("../models/user");
const {ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KET} = require("./constans");
const redisClient = require("./init_redis");
const fs = require("fs");
const path = require("path");

function numberRandomGenerator() {
    return Math.floor(Math.random() * 90000 + 10000);
}

function SignAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {mobile: user.mobile, userID: user._id};
        const options = {expiresIn: "1h"};
        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            // if (err) reject(createError.InternalServerError("خطای سرور"));
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
        JWT.sign(payload, REFRESH_TOKEN_SECRET_KET, options, async (err, token) => {
            // if (err) reject(createError.InternalServerError("خطای سرور"));
            await redisClient.setEx(userId, 365 * 24 * 60 * 60, token);
            resolve(token);
        });
    });
}

function VerifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        JWT.verify(token, REFRESH_TOKEN_SECRET_KET, async (err, payload) => {
            console.log(err, "err");
            if (err) reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile}, {password: 0, token: 0, otp: 0});
            console.log({user});
            if (!user) reject(createError.Unauthorized("حساب کاربری یافت نشد"));
            const refreshToken = await redisClient.get(user._id || "key_default");
            if (!refreshToken) reject(createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"));
            if (token === refreshToken) return resolve(mobile);
            reject(createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"));
        });
    });
}

function ListOfImagesFromRequest(files, fileUploadPath) {
    if (files?.length > 0) {
        return files.map(file => path.join(fileUploadPath, file.filename)).map(item => item.replace(/\\/g, "/"));
    } else {
        return [];
    }
}

function deleteFileInPublic(fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
}

module.exports = {ListOfImagesFromRequest, deleteFileInPublic, numberRandomGenerator, SignAccessToken, SignRefreshToken, VerifyRefreshToken};
