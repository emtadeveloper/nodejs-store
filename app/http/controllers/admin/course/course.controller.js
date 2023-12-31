const {CourseModel} = require("../../../../models/course");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const Controller = require("../../controller");
const path = require("path");
const {createCourseSchema} = require("../../../validators/admin/course/course.schema");
const createHttpError = require("http-errors");
const {default: mongoose} = require("mongoose");

class CourseController extends Controller {
    //
    async getListOfCourse(req, res, next) {
        try {
            const {search} = req.query;
            let courses;
            if (search) courses = await CourseModel.find({$text: {$search: search}}).sort({_id: -1}); // میاد و از آخرین رکورد برام میفرسته
            courses = await CourseModel.find({}).sort({_id: -1}); // میاد و از آخرین رکورد برام میفرسته
            return res.status(HttpStatus.OK).json({
                stautsCodes: HttpStatus.OK,
                data: {courses},
            });
        } catch (error) {
            next(error);
        }
    }

    async addCourses(req, res, next) {
        try {
            console.log(req.body, "===");
            await createCourseSchema.validateAsync(req.body);
            const {fileUploadPath, filename} = req.body;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            const teacher = req.user._id;
            const {title, short_text, text, type, tags, category, price, discount} = req.body;
            if (Number(price) > 0 && type === "free") throw createHttpError.BadRequest("برای دوره رایگان نمی توان قیمت ثبت کرد");
            const course = await CourseModel.create({
                title,
                short_text,
                text,
                type,
                tags,
                category,
                price,
                discount,
                image,
                time: "00:00:00",
                status: "notStarted",
                teacher,
            });
            if (!course?._id) throw createHttpError.InternalServerError("دوره ثبت نشد");
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    course: {title, short_text, text, type, tags, category, price, discount, image},
                },
            });
        } catch (error) {
            console.log(error, "error");
            next(error);
        }
    }

    async editCourses(req, res, next) {}

    async addChapter(req, res, next) {
        try {
            const {id, title, text} = req.body;
            console.log(id, title, text, "id, title, text", req.body);
            await this.findCoursById(id);
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

    async findCoursById(id) {
        if (!mongoose.isObjectIdOrHexString(id)) throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمی باشد");
        console.log(id, "id");
        const course = await CourseModel.findById(id);
        if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");
        return course;
    }
}

module.exports = new CourseController();
