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
