const productController = require("../../../http/controllers/admin/product/product.controller");

const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *             type: object
 *             required:
 *               - title
 *               - short_text
 *               - text
 *               - tags
 *               - category
 *               - price
 *               - discount
 *               - count
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *                 description: the title of the product
 *               short_text:
 *                 type: string
 *                 description: the short description of the product
 *               text:
 *                 type: string
 *                 description: the full description of the product
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: the tags assigned to the product
 *               category:
 *                 type: string
 *                 description: the category of the product
 *               price:
 *                 type: string
 *                 description: the price of the product
 *               discount:
 *                 type: string
 *                 description: the discount on the product
 *               count:
 *                 type: string
 *                 description: the available count of the product
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: the image file of the product
 */

/**
 * @swagger
 * /admin/product/add:
 *   post:
 *     summary: Create and save a new product
 *     description: Endpoint for admin to add a product to the database
 *     tags: [Product(AdminPanel)]
 *     consumes:
 *     - "multipart/form-data"
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *              $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product details uploaded successfully
 *       500:
 *         description: Internal server error
 */

router.post("/", productController.addProduct);

module.exports = {
    AdminApiProductRouter: router,
};
