const {CategoryRouter} = require("./category/category");
const {BlogRouter} = require("./blog/blog");
const {VerifyAccessToken} = require("./../../http/middlewares/verifyAccessToken");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   - name: AdminPanel
 *     description: Actions an admin can perform (add, remove, edit, etc.)
 *   - name: Category(AdminPanel)
 *     description: Methods and routes related to the category section within the Admin Panel
 *
 * responses:
 *   201:
 *     description: Success
 */

router.use("/category", VerifyAccessToken, CategoryRouter);

router.use("/blogs", VerifyAccessToken, BlogRouter);

module.exports = {
    adminRoutes: router,
};
