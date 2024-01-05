/**
 * @swagger
 * /admin/chapter/add:
 *   put:
 *     summary: Create and save a new product
 *     description: Endpoint for admin to add a product to the database
 *     tags: [Chapter(AdminPanel)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AddChapter'
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

/**
 * @swagger
 * /admin/chapter/update/{ChapterID}:
 *   patch:
 *     summary: Create and save a new product
 *     description: remove a chapter of course
 *     tags: [Chapter(AdminPanel)]
 *     parameters:
 *         - in: path
 *           name: ChapterID
 *           type: string
 *           required : true
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *              $ref: '#/components/schemas/EditChapter'
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/EditChapter'
 *     responses:
 *       201:
 *         description: Product details uploaded successfully
 *         content:
 *            application/json:
 *                  schema:
 *                     $ref: '#/definitions/ChapterOfCourseDefinition'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/chapter/list/{CourseID}:
 *   get:
 *     summary: Create and save a new product
 *     description: Endpoint for admin to add a product to the database
 *     tags: [Chapter(AdminPanel)]
 *     parameters:
 *         - in: path
 *           name: CourseID
 *           type: string
 *           required : true
 *     responses:
 *       201:
 *         description: Product details uploaded successfully
 *         content:
 *            application/json:
 *                  schema:
 *                     $ref: '#/definitions/ChapterOfCourseDefinition'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/chapter/remove/{ChapterID}:
 *   patch:
 *     summary: Create and save a new product
 *     description: remove a chapter of course
 *     tags: [Chapter(AdminPanel)]
 *     parameters:
 *         - in: path
 *           name: ChapterID
 *           type: string
 *           required : true
 *     responses:
 *       201:
 *         description: Product details uploaded successfully
 *         content:
 *            application/json:
 *                  schema:
 *                     $ref: '#/definitions/ChapterOfCourseDefinition'
 *       500:
 *         description: Internal server error
 */
