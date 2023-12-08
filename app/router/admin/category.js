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

/**
 * @swagger
 * /admin/category/parents:
 *   get:
 *     tags: [Category(AdminPanel)]
 *     summary: get All Parents of category or catergory heads
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Error in request parameters/body.
 */

router.get("/parents", CategoryController.getAllParents);

/**
 * @swagger
 * /admin/category/children/{parent}:
 *   get:
 *     tags: [Category(AdminPanel)]
 *     summary: get All children of parents or catergory heads
 *     parameters :
 *        - in : path
 *          name : parent
 *          type : string
 *          required : true
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Error in request parameters/body.
 */

router.get("/children/:parent", CategoryController.getChildOfParents);

/**
 * @swagger
 * /admin/category/all:
 *   get:
 *     tags: [Category(AdminPanel)]
 *     summary: get All Categories
 *     responses:
 *       200:
 *         description: successfully.
 */

router.get("/all", CategoryController.getAllCategory);

/**
 * @swagger
 * /admin/category/remove/{id}:
 *   delete:
 *     tags: [Category(AdminPanel)]
 *     summary: remove category with object-id
 *     parameters :
 *        - in : path
 *          name : id
 *          type : string
 *          required : true
 *     responses:
 *       200:
 *         description: successfully.
 */

router.delete("/remove/:id", CategoryController.removeCategory);

/**
 * @swagger
 * /admin/category/{id}:
 *   get:
 *     tags: [Category(AdminPanel)]
 *     summary: find category by id
 *     parameters :
 *        - in : path
 *          name : id
 *          type : string
 *          required : true
 *     responses:
 *       200:
 *         description: successfully.
 */

router.get("/:id", CategoryController.getCategoryById);

module.exports = {
    CategoryRouter: router,
};
