/**
 * @swagger
 * /admin/episode/add:
 *   post:
 *     summary: Create and save a new product
 *     description: Endpoint for admin to add a product to the database
 *     tags: [Episode(AdminPanel)]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *              $ref: '#/components/schemas/AddEpisode'
 *     responses:
 *       201:
 *         description: Product details uploaded successfully
 *         content:
 *            application/json:
 *                  schema:
 *                     $ref: '#/definitions/publicDefinitions'
 *       500:
 *         description: Internal server error
 */
