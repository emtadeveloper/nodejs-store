const homeController = require("../../http/controllers/api/home.controller");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description : index page route and dat
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description : get all need data for index page
 *      responses:
 *          200:
 *              description: success
 *              schema:
 *                  type: string
 *                  example : Index Page Store
 *          404:
 *              description: not Found
 */


router.get("/", VerifyAccessToken, homeController.indexPage);

module.exports = {HomeRoutes: router};
