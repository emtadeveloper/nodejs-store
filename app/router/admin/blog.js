const AdminBlogController = require("../../http/controllers/admin/blog/blog.controller");

const router = require("express").Router();

/**
 * @swagger
 * /admin/blogs/add:
 *   post:
 *     tags:
 *       - AdminPanel
 *     summary: "Create a new blog category"
 *     consumes:
 *       - multipart/form-data
 *       - application/x-www-form-data-urlencoded
 *     parameters:
 *       - in: formData
 *         name: title
 *         type: string
 *         required: true
 *         description: "The title of the blog category"
 *       - in: formData
 *         name: text
 *         type: string
 *         required: true
 *         description: "The detailed text of the blog category"
 *       - in: formData
 *         name: short_text
 *         type: string
 *         required: true
 *         description: "A short description of the blog category"
 *       - in: formData
 *         name: tags
 *         type: string
 *         required: true
 *         description: "Associated tags for the category, separated by #"
 *         example: "tag1#tag2#tag3"
 *       - in: formData
 *         name: category
 *         type: string
 *         required: true
 *         description: "The ID of the parent category"
 *       - in: formData
 *         name: image
 *         type : file
 *         required: true
 *         description: "Image file for the blog category"
 *     responses:
 *       201:
 *         description: "Category created successfully."
 *       400:
 *         description: "Error in request parameters/body."
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
