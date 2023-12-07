const createHttpError = require("http-errors");
const {chackOtpSchema, getOtpSchema} = require("../../../validators/user/auth.shema");
const {UserModel} = require("../../../../models/user");
const {numberRandomGenerator, SignAccessToken, SignRefreshToken, VerifyRefreshToken} = require("../../../../utils/function");
const {ROLES} = require("../../../../utils/constans");
const Controller = require("../../controller");
class UserAuthController extends Controller {
    //
    async getOtp(req, res, next) {
        try {
            await getOtpSchema.validateAsync(req.body);
            const {mobile} = req.body;
            const code = numberRandomGenerator();
            const result = await this.saveUser(mobile, code);
            console.log(mobile, req.body, "result req.body");
            if (!result) throw createHttpError.Unauthorized("ورود شما انجام نشد");
            return res.status(200).send({
                data: {
                    statusCode: 200,
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
            console.log(refreshToken);
            const mobile = await VerifyRefreshToken(refreshToken);
            console.log(mobile);
            const user = await UserModel.findOne({mobile});
            console.log(user);
            const accessToken = await SignAccessToken(user._id);
            console.log(user, accessToken);
            const newRefreshToken = await SignRefreshToken(user._id);
            // console.log(accessToken, newRefreshToken);
            return res.json({data: {accessToken, refreshToken: newRefreshToken}});
        } catch (error) {
            next(error);
        }
    }

    async checkOtp(req, res, next) {
        try {
            await chackOtpSchema.validateAsync(req.body);
            const {mobile, code} = req.body;
            console.log({mobile}, {code});
            const user = await UserModel.findOne({mobile});
            if (!user) throw createHttpError.NotFound("کاربر یافت نشد");
            if (user?.otp?.code != code) throw createHttpError.Unauthorized("کد ارسال شده صحیح نمی باشد");
            const now = Date.now();
            console.log(+user.otp.expireIn < now);
            if (+user.otp.expireIn < now) throw createHttpError.Unauthorized("کد شما منقضی شده است");
            const accessToken = await SignAccessToken(user._id);
            const refreshToken = await SignRefreshToken(user._id);
            console.log(refreshToken, "refreshToken");
            return res.json({data: {accessToken, refreshToken}});
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
        return !!UserModel.create({mobile, otp, Roles: [ROLES.USER]});
    }

    async checkExitsUser(mobile) {
        const user = await UserModel.findOne({mobile});
        return !!user;
    }

    async updateUser(mobile, objectData = {}) {
        Object.keys(objectData).forEach(key => {
            if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key])) delete objectData[key];
        });
        console.log(objectData, "objectData");
        const updateResult = await UserModel.updateOne({mobile}, {$set: objectData});
        return !!updateResult.modifiedCount;
    }
}

module.exports = {UserAuthController: new UserAuthController()};
