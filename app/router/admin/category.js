const CategoryController = require("../../http/controllers/admin/category/category.controller");

const router = require("express").Router();

/**
 * @swagger
 * /admin/category/add:
 *   post:
 *     tags: [Category(AdminPanel)]
 *     summary: create new category title
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *               parent:
 *                 type: string
 *                 required: false
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Error in request parameters/body.
 */

router.post("/add", CategoryController.addCategory);

module.exports = {
    CategoryRouter: router,
};
