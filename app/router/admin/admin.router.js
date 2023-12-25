const {AdminApiCategoryRouter} = require("./category/category");
const {AdminApiBlogRouter} = require("./blog/blog");
const {VerifyAccessToken} = require("./../../http/middlewares/verifyAccessToken");
const {AdminApiProductRouter} = require("./Product/Product");
const router = require("express").Router();

/** 
 * @swagger
 * 
 * tags:
 *   - name: AdminPanel
 *     description: Actions an admin can perform (add, remove, edit, etc.)
 *   - name: Product(AdminPanel)
 *     description: Actions an admin can perform (add, remove, edit, etc.)
 *   - name: Blog(AdminPanel)
 *     description: Actions an admin can perform (add, remove, edit, etc.)
 *   - name: Category(AdminPanel)
 *     description: Methods and routes related to the category section within the Admin Panel
 *   - name: UserAuthentication(AdminPanel)
 *     description: Actions an admin can perform (add, remove, edit, etc.)
 * 
 * responses:
 *   201:
 *     description: Success
 */

router.use("/product", AdminApiProductRouter);

router.use("/category", VerifyAccessToken, AdminApiCategoryRouter);

router.use("/blogs", VerifyAccessToken, AdminApiBlogRouter);


module.exports = {
    adminRoutes: router,
};
