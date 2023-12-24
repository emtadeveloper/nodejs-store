const productController = require("../../../http/controllers/admin/product/product.controller");

const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       required:
 *         - title
 *         - short_text
 *         - text
 *         - tags
 *         - category
 *         - price
 *         - discount
 *         - count
 *       properties:
 *         title:
 *           type: string
 *           description: the title of product
 *         short_text:
 *           type: string
 *           description: the short text of product
 *         text:
 *           type: string
 *           description: the full text of product
 *         tags:
 *           type: array
 *           description: the tags of product
 *         category:
 *           type: string
 *           description: the category of product
 *         price:
 *           type: string
 *           description: the price of product
 *         discount:
 *           type: string
 *           description: the discount of product
 *         count:
 *           type: string
 *           description: the count of product
 *         image:
 *           type: file
 *           format: binary
 *           description: the image of product
 *
 */

/**
 * @swagger
 * /admin/product/add:
 *   post:
 *     tags:
 *       - Product(AdminPanel)
 *     summary: create and save product
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 */

router.post("/", productController.addProduct);

module.exports = {
    AdminApiProductRouter: router,
};
