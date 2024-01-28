const createHttpError = require("http-errors");
const {chackOtpSchema, getOtpSchema} = require("../../../validators/user/auth.shema");
const {UserModel} = require("../../../../models/user");
const {numberRandomGenerator, SignAccessToken, SignRefreshToken, VerifyRefreshToken} = require("../../../../utils/function");
const {ROLES} = require("../../../../utils/constans");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");

class UserAuthController extends Controller {
    //
    async getOtp(req, res, next) {
        try {
            await getOtpSchema.validateAsync(req.body);
            const {mobile} = req.body;
            const code = numberRandomGenerator();
            const result = await this.saveUser(mobile, code);
            if (!result) throw createHttpError.Unauthorized("ورود شما انجام نشد");
            return res.status(HttpStatus.OK).send({
                statusCode: HttpStatus.OK,
                data: {
                    message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد",
                    mobile,
                    code,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const {refreshToken} = req.body;
            const mobile = await VerifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({mobile});
            const accessToken = await SignAccessToken(user._id);
            const newRefreshToken = await SignRefreshToken(user._id);
            return res.status(HttpStatus.OK).json({statusCode: HttpStatus.OK, data: {accessToken, refreshToken: newRefreshToken}});
        } catch (error) {
            next(error);
        }
    }

    async checkOtp(req, res, next) {
        try {
            await chackOtpSchema.validateAsync(req.body);
            const {mobile, code} = req.body;
            console.log(mobile, code, "mobile, code");
            const user = await UserModel.findOne({mobile});
            if (!user) throw createHttpError.NotFound("کاربر یافت نشد");
            if (user?.otp?.code != code) throw createHttpError.Unauthorized("کد ارسال شده صحیح نمی باشد");
            const now = Date.now();
            if (+user.otp.expireIn < now) throw createHttpError.Unauthorized("کد شما منقضی شده است");
            const accessToken = await SignAccessToken(user._id);
            const refreshToken = await SignRefreshToken(user._id);
            return res.status(HttpStatus.OK).json({statusCode: HttpStatus.OK, data: {accessToken, refreshToken}});
        } catch (error) {
            next(error);
        }
    }

    async saveUser(mobile, code) {
        let otp = {code, expireIn: new Date().getTime() + 1200000};
        const result = await this.checkExitsUser(mobile);
        if (result) {
            return await this.updateUser(mobile, {otp});
        }
        return !!UserModel.create({mobile, otp, Role: ROLES.USER});
    }

    async checkExitsUser(mobile) {
        const user = await UserModel.findOne({mobile});
        return !!user;
    }

    async updateUser(mobile, objectData = {}) {
        Object.keys(objectData).forEach(key => {
            if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key])) delete objectData[key];
        });
        const updateResult = await UserModel.updateOne({mobile}, {$set: objectData});
        return !!updateResult.modifiedCount;
    }
}

module.exports = {UserAuthController: new UserAuthController()};
