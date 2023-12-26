const CourseController = require("../../../http/controllers/admin/course/course.controller");
const {stringToArray} = require("../../../http/middlewares/stringToArray");
const {uploadFile} = require("../../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *      Types :
 *          type : array
 *          items:
 *              type : string
 *              enum :
 *                  - free
 *                  - cash
 *                  - spechail
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *             type: object
 *             required:
 *               - title
 *               - short_text
 *               - text
 *               - tags
 *               - category
 *               - price
 *               - discount
 *               - image
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *                 description: the title of the product
 *                 example : عنوان دوره
 *               short_text:
 *                 type: string
 *                 description: the short description of the product
 *                 example : مثال کوتاه شده دوره
 *               text:
 *                 type: string
 *                 description: the full description of the product
 *                 example : مثال کوتاه شده دوره
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
 *               images:
 *                 type: string
 *                 format: binary
 *                 description: the image count of the product
 *               type:
 *                   $ref: '#/components/schemas/Types'
 *     Edit-Course:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: the title of the product
 *                 example : عنوان دوره
 *               short_text:
 *                 type: string
 *                 description: the short description of the product
 *                 example : مثال کوتاه شده دوره
 *               text:
 *                 type: string
 *                 description: the full description of the product
 *                 example : مثال کوتاه شده دوره
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
 *               images:
 *                 type: string
 *                 format: binary
 *                 description: the image count of the product
 *               type:
 *                   $ref: '#/components/schemas/Types'
 */

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

router.get("/list", CourseController.getListCourse);

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
 *              $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Product details uploaded successfully
 *       500:
 *         description: Internal server error
 */

router.post("/add", uploadFile.single("image"), stringToArray("tags"), CourseController.addCourses);

/**
 * @swagger
 * /admin/courses/edit:
 *   patch:
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
 *              $ref: '#/components/schemas/Edit-Course'
 *     responses:
 *       200:
 *         description: Product details uploaded successfully
 *       500:
 *         description: Internal server error
 */

router.patch("/edit", uploadFile.single("image"), stringToArray("tags"), CourseController.editCourses);

module.exports = {
    AdminApiCourseRouter: router,
};
