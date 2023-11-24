const createHttpError = require("http-errors");
const {authShema} = require("../../../validators/user/auth.shema");

class UserAuthController {
    async login(req, res, next) {
        try {
            const result = await authShema.validateAsync(req.body);
            return res.status(200).send("ورود شما با موفقیت انجام شد");
        } catch (error) {
            next(createHttpError.BadRequest(error.message));
        }
    }
}

module.exports = {UserAuthController: new UserAuthController()};
