const createHttpError = require("http-errors");
const {CourseModel} = require("../../../../models/course");
const Controller = require("../../controller");
const {default: mongoose} = require("mongoose");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const CourseController = require("./course.controller");
const {deleteInvalidPropertyObject} = require("../../../../utils/function");

class ChapterController extends Controller {
    async addChapter(req, res, next) {
        try {
            const {id, title, text} = req.body;
            await CourseController.findCoursById(id);
            // $push  میتونیم بیایم و داخل یک آبجکت یا آرایه اضافه بکنیم
            const saveChapterResult = await CourseModel.updateOne({_id: id}, {$push: {chapters: {title, text, episodes: []}}});
            if (saveChapterResult.modifiedCount === 0) throw createHttpError.InternalServerError("فصل افزوده شد");
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {message: "فصل با موفقیت ایجاد شد"},
            });
        } catch (error) {
            next(error);
        }
    }

    async ChapterOfCourse(req, res, next) {
        try {
            const {CourseID} = req.params;
            console.log(req.params);
            const Course = await this.getChapterOfCourse(CourseID);
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {Course},
            });
        } catch (error) {
            next(error);
        }
    }

    async getChapterOfCourse(id) {
        const chapter = await CourseModel.findOne({_id: id}, {chapters: 1});
        if (!chapter) throw createHttpError.NotFound("دوره ای با این شناسه یافت نشد");
        return chapter;
    }

    async removeChapterById(req, res, next) {
        try {
            const {ChapterID} = req.params;
            await this.getOneChapter(ChapterID);
            const removeChapterResult = await CourseModel.updateOne({"chapters._id": ChapterID}, {$pull: {chapters: {_id: ChapterID}}});
            console.log({removeChapterResult}, "removeChapterResult");
            if (removeChapterResult.modifiedCount === 0) throw new createHttpError.InternalServerError("حذف فصل با موفقیت انجام شد");
            return res.status(HttpStatus.OK).json({
                data: {
                    message: " حذف فصل با موفقیت انجام شد",
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async UpdateChapterById(req, res, next) {
        try {
            const {ChapterID} = req.params;
            await this.getOneChapter(ChapterID);
            const data = req.body;
            deleteInvalidPropertyObject(data, ["_id"]);
            const updateChapterResult = await CourseModel.updateOne({"chapters._id": ChapterID}, {$set: {"chapters.$": data}})

            if (updateChapterResult.modifiedCount === 0) throw new createHttpError.InternalServerError("به روزرسانی با مشکل مواجه شده است");
            return res.status(HttpStatus.OK).json({
                data: {
                    message: " به روزرسانی  با موفقیت انجام شد ",
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async getOneChapter(id) {
        const chapter = await CourseModel.findOne({"chapters._id": id}, {"chapters.$": 1});
        if (!chapter) throw new createHttpError.NotFound("فصلی با این شناسه یافت نشد");
        return chapter;
    }
}

module.exports = new ChapterController();

//  چه موقعی از popluagte  استفاده میکنیم موقعی که آیدی رو داریم و حالا میخایم بیایم و متناسب با اون آیدی ها
// بیایم و اطلاعات اون هارو از دیتابیس بکشونیم و بخونیم
