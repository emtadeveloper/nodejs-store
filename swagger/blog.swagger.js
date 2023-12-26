/**
 * @swagger
 * /admin/blogs/add:
 *   post:
 *     summary: Upload an image
 *     description: Uploads details for a blog category including an image
 *     tags: [Blog(AdminPanel)]
 *     consumes:
 *     - "multipart/form-data"
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - text
 *               - short_text
 *               - tags
 *               - category
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *               short_text:
 *                 type: string
 *               tags:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog category details uploaded successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/blogs:
 *   get:
 *     tags: [Blog(AdminPanel)]
 *     summary: get all blogs
 *     responses:
 *       200:
 *         description: success
 */

/**
 * @swagger
 * /admin/blogs/{id}:
 *   patch:
 *     summary: update an image
 *     description: Uploads details for a blog category including an image
 *     tags: [Blog(AdminPanel)]
 *     consumes:
 *     - "multipart/form-data"
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *               short_text:
 *                 type: string
 *               tags:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog category details uploaded successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/blogs/{id}:
 *   get:
 *     tags: [Blog(AdminPanel)]
 *     summary: get blog by ID and populate this field
 *     parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required : true
 *     responses:
 *       200:
 *         description: success
 */
/**
 * @swagger
 * /admin/blogs/{id}:
 *   delete:
 *     tags: [Blog(AdminPanel)]
 *     summary: delete blog by ID and populate this field
 *     parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required : true
 *     responses:
 *       200:
 *         description: success
 */
