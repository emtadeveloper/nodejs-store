const {uploadFile} = require("../../../utils/multer");
const AdminBlogController = require("../../../http/controllers/admin/blog/blog.controller");
const {stringToArray} = require("../../../http/middlewares/stringToArray");

const router = require("express").Router();

router.post("/add", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog);
router.get("/", AdminBlogController.getListOfBlogs);
router.patch("/update/:id", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.updateBlogById);
router.get("/:id", AdminBlogController.getOneBlogById);
router.delete("/:id", AdminBlogController.deleteBlogById);

module.exports = {
    AdminApiBlogRouter: router,
};
