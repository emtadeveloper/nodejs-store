const {UserAuthController} = require("../../http/controllers/user/auth/auth.controller");
const {VerifyRefreshToken} = require("../../http/middlewares/verifyAccessToken");

const router = require("express").Router();

/**
 * @swagger
 *  /user/get-otp:
 *    post:
 *      tags: [UserAuthentication(AdminPanel)]
 *      summary: Login in user-panel with phone number
 *      description: One time password (OTP) login.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - mobile
 *              properties:
 *                mobile:
 *                  type: string
 *                  description: "fa-IR phone number"
 *                  example: "09154144503"
 *      responses:
 *        200:
 *          description: Success
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Internal Server Error
 */

router.post("/get-otp", UserAuthController.getOtp);

/**
 * @swagger
 *  /user/check-otp:
 *    post:
 *      tags: [UserAuthentication(AdminPanel)]
 *      summary: Check OTP value in user controller
 *      description: Check OTP with code, mobile, and expires data.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - mobile
 *                - code
 *              properties:
 *                mobile:
 *                  type: string
 *                  description: fa-IR phone number
 *                  example: "09154144503"
 *                code:
 *                  type: string
 *                  description: Enter SMS code received
 *                  example: "123456"
 *      responses:
 *        200:
 *          description: Success
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Internal Server Error
 */

router.post("/check-otp", UserAuthController.checkOtp);

/**
 * @swagger
 *  /user/refresh-token:
 *    post:
 *      tags: [UserAuthentication(AdminPanel)]
 *      summary: Send refresh token to get a new access token and refresh token
 *      description: Refresh token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - refreshToken
 *              properties:
 *                refreshToken:
 *                  type: string
 *                  description: The refresh token that was issued previously to the client
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
 *      responses:
 *        200:
 *          description: Success
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Internal Server Error
 */

router.post("/refresh-token", UserAuthController.refreshToken);

module.exports = {
    UserAuthRoutes: router,
};
