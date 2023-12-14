const AdminBlogController = require("../../http/controllers/admin/blog/blog.controller");

const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogCategory:
 *       type: object
 *       required:
 *         - title
 *         - text
 *         - short_text
 *         - tags
 *         - category
 *         - image
 *       properties:
 *         title:
 *           type: string
 *           description: "The title of the blog category"
 *         text:
 *           type: string
 *           description: "The detailed text of the blog category"
 *         short_text:
 *           type: string
 *           description: "A short description of the blog category"
 *         tags:
 *           type: string
 *           description: "Associated tags for the category, separated by #"
 *           example: "tag1#tag2#tag3"
 *         category:
 *           type: string
 *           description: "The ID of the parent category"
 *         image:
 *           type: string
 *           format: binary
 *           description: "Image file for the blog category"
 *       example:
 *         title: "A Guide to Modern Web Development"
 *         text: "Detailed article content here"
 *         short_text: "An overview of modern web development practices"
 *         tags: "webdev#coding#javascript"
 *         category: "5f2b39035a83a33d2f3dfcc5"
 *         image: (binary)
 */

/**
 * @swagger
 * /admin/blogs/add:
 *   post:
 *     summary: Upload an image
 *     description: Uploads details for a blog category including an image
 *     tags:
 *     - AdminPanel
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

router.post("/add", AdminBlogController.createBlog);

/**
 * @swagger
 * /admin/blogs:
 *   post:
 *     tags: [Blog(AdminPanel)]
 *     summary: get all blogs
 *     responses:
 *       200:
 *         description: success
 */

router.get("/", AdminBlogController.getListOfBlogs);
module.exports = {
    BlogRouter: router,
};
