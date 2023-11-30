const {UserAuthController} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: User-Authentication
 *  description : user-auth section
 */

/**
 * @swagger
 *       /user/get-otp:
 *  post:
 *      tags : [User-Authentication]
 *      summary: login in  user-panel with phone number
 *      description : one time  password(OTP)  login
 *      parameters:
 *          -  name : mobile
 *             description : fa-IRI phone-number
 *             in : formData
 *             required : true
 *             schema :
 *                       type: string
 *      responses:
 *          200:
 *              description:  Success
 *          400:
 *              description:  Bas Request
 *          401:
 *              description:  UnAuthorization
 *          500:
 *              description: Internal Server Error
 */

router.post("/get-otp", UserAuthController.getOtp);

/**
 * @swagger
 *       /user/check-otp:
 *  post:
 *      tags : [User-Authentication]
 *      summary: check-otp  value in  user controller
 *      description : check otp with code mobile and expires data
 *      parameters:
 *          -  name : mobile
 *             description : fa-IRI phone-number
 *             in : formData
 *             required : true
 *             schema :
 *                       type: string
 *          -  name : code
 *             description : enter sms code revived
 *             in : formData
 *             required : true
 *             schema :
 *                       type: string
 *      responses:
 *          200:
 *              description:  Success
 *          400:
 *              description:  Bas Request
 *          401:
 *              description:  UnAuthorization
 *          500:
 *              description: Internal Server Error
 */

router.post("/check-otp", UserAuthController.checkOtp);

/**
 * @swagger
 *       /user/refresh-token:
 *  post:
 *      tags : [User-Authentication]
 *      summary: send refresh token for get new token and  refresh token
 *      description :   refresh token
 *      parameters:
 *          -  name : refreshToken
 *             in : body
 *             required : true
 *             schema :
 *                       type: string

 *      responses:
 *          200:
 *              description:  Success
 *          400:
 *              description:  Bas Request
 *          401:
 *              description:  UnAuthorization
 *          500:
 *              description: Internal Server Error
 */

router.post("/refresh-token", UserAuthController.refreshToken);

module.exports = {
    UserAuthRoutes: router,
};
