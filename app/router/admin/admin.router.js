const {CategoryRouter} = require("./category");
const router = require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: create new category title
 *          responses:
 *              201:
 *                  description: success
 */

router.use("/category", CategoryRouter);

module.exports = {
    adminRoutes: router,
};
