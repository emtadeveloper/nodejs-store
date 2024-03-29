/**
 * @swagger
 * /admin/courses/list:
 *   get:
 *     tags: [Course(AdminPanel)]
 *     summary: create new category title
 *     parameters:
 *          - in : query
 *            name : search
 *            type : text
 *            description : title for search
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Error in request parameters/body.
 */
/**
 * @swagger
 * /admin/courses/add:
 *   post:
 *     summary: Create and save a new product
 *     description: Endpoint for admin to add a product to the database
 *     tags: [Course(AdminPanel)]
 *     consumes:
 *     - "multipart/form-data"
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *              $ref: '#/components/schemas/Insert-Course'
 *     responses:
 *       201:
 *         description: Product details uploaded successfully
 *         content:
 *            application/json:
 *                  schema:
 *                     $ref: '#/definitions/ListOfCourses'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/courses/update/{CourseId}:
 *   patch:
 *     summary: Create and save a new product
 *     description: Endpoint for admin to add a product to the database
 *     tags: [Course(AdminPanel)]
 *     consumes:
 *     - "multipart/form-data"
 *     produces:
 *     - "application/json"
 *     parameters:
 *       - in: path
 *         name: CourseId
 *         required: true
 *         schema:
 *           type: string
 *         description: get one course by Id
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *              $ref: '#/components/schemas/Edit-Course'
 *     responses:
 *       200:
 *         description: Product details uploaded successfully
 *         content:
 *            application/json:
 *                  schema:
 *                     $ref: '#/definitions/ListOfCourses'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/courses/{id}:
 *   get:
 *     summary: Retrieve a single product
 *     description: Allows an admin to retrieve detailed information about a specific product by ID.
 *     tags: [Course(AdminPanel)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: get one course by Id
 *     responses:
 *       200:
 *         description: Details of the specified product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
