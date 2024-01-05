const CourseController = require("../../../http/controllers/admin/course/course.controller");
const {stringToArray} = require("../../../http/middlewares/stringToArray");
const {uploadFile} = require("../../../utils/multer");

const router = require("express").Router();

router.get("/list", CourseController.getListOfCourse);
router.post("/add", uploadFile.single("image"), stringToArray("tags"), CourseController.addCourses);
router.patch("/edit", uploadFile.single("image"), stringToArray("tags"), CourseController.editCourses);
router.get("/:id", CourseController.getListOfCourse);
router.put("/add-chapter", CourseController.addChapter);

module.exports = {
    AdminApiCourseRouter: router,
};
