const CourseController = require("../../../http/controllers/admin/course/course.controller");
const {stringToArray} = require("../../../http/middlewares/stringToArray");
const {uploadFile} = require("../../../utils/multer");

const router = require("express").Router();

router.get("/list", CourseController.getListOfCourse); //get all course
router.get("/:id", CourseController.getCourseById); //get all course
router.post("/add", uploadFile.single("image"), stringToArray("tags"), CourseController.addCourses);
router.patch("/update/:CourseId", uploadFile.single("image"), stringToArray("tags"), CourseController.updateCourseById);
router.get("/:id", CourseController.getListOfCourse);

module.exports = {
    AdminApiCourseRouter: router,
};
