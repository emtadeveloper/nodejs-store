const ChapterController = require("../../../http/controllers/admin/course/chapter.controller");

const router = require("express").Router();

router.put("/add", ChapterController.addChapter);
router.get("/list/:CourseID", ChapterController.ChapterOfCourse);
router.patch("/remove/:ChapterID", ChapterController.removeChapterById);

module.exports = {
    AdminApiChapterRouter: router,
};
