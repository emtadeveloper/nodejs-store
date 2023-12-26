const productController = require("../../../http/controllers/admin/product/product.controller");
const {stringToArray} = require("../../../http/middlewares/stringToArray");
const {uploadFile} = require("../../../utils/multer");

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
 *               images:
 *                 type: array
 *                 items:
 *                      type: string
 *                      format: binary
 *                 description: the image count of the product
 *               wight:
 *                 type: string
 *                 description:  the wight file of the product packet
 *               height:
 *                 type: string
 *                 description:  the height file of the product packet
 *               width:
 *                 type: string
 *                 description:  the width file of the product packet
 *               length:
 *                 type: string
 *                 description:  the length file of the product packet
 *               colors:
 *                 type: array
 *                 items:
 *                      type: string
 *                 description: the image count of the product
 *               type:
 *                 type: string
 *                 enum: [virtual, physical]
 *                 description: the type of the product, either a virtual or physical item
 *     Edit-Product:
 *             type: object
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
 *               images:
 *                 type: array
 *                 items:
 *                      type: string
 *                      format: binary
 *                 description: the image count of the product
 *               wight:
 *                 type: string
 *                 description:  the wight file of the product packet
 *               height:
 *                 type: string
 *                 description:  the height file of the product packet
 *               width:
 *                 type: string
 *                 description:  the width file of the product packet
 *               length:
 *                 type: string
 *                 description:  the length file of the product packet
 *               colors:
 *                 type: array
 *                 items:
 *                      type: string
 *                 description: the image count of the product
 *               type:
 *                 type: string
 *                 enum: [virtual, physical]
 *                 description: the type of the product, either a virtual or physical item
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

router.post("/add", uploadFile.array("images", 10), stringToArray("tags", "colors"), productController.addProduct);

/**
 * @swagger
 * /admin/product/edit/{id}:
 *   patch:
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
 *              $ref: '#/components/schemas/Edit-Product'
 *     responses:
 *       200:
 *         description: Product details uploaded successfully
 *       500:
 *         description: Internal server error
 */

router.patch("/edit/:id", uploadFile.array("images", 10), stringToArray("tags", "colors"), productController.editProduct);

/**
 * @swagger
 * /admin/product/list:
 *   get:
 *     summary: get all products
 *     description: Endpoint for admin to add a product to the database
 *     tags: [Product(AdminPanel)]
 *     parameters:
 *          - in : query
 *            name : search
 *            type: string
 *            description: text for search
 *     responses:
 *       200:
 *         description: Product details uploaded successfully
 *       500:
 *         description: Internal server error
 */

router.get("/list", productController.getAllProducts);

/**
 * @swagger
 * /admin/product/{id}:
 *   get:
 *     summary: Retrieve a single product
 *     description: Allows an admin to retrieve detailed information about a specific product by ID.
 *     tags:
 *       - Product(AdminPanel)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the product
 *     responses:
 *       200:
 *         description: Details of the specified product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id", productController.getOneProduct);

/**
 * @swagger
 * /admin/product/remove/{id}:
 *   delete:
 *     summary: delete  a single product
 *     description: Allows an admin to retrieve detailed information about a specific product by ID.
 *     tags:
 *       - Product(AdminPanel)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the product
 *     responses:
 *       200:
 *         description: Details of the specified product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id", productController.getOneProduct);

module.exports = {
    AdminApiProductRouter: router,
};
