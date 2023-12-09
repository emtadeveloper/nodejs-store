const {CategoryRouter} = require("./category");
const {BlogRouter} = require("./blog");
const {uploadFile} = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");
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

router.use("/category", CategoryRouter);

router.use("/blog",uploadFile.single("image"),stringToArray("tags") , BlogRouter);

module.exports = {
    adminRoutes: router,
};
