const {CourseModel} = require("../../../../models/course");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const Controller = require("../../controller");
const path = require("path");
const {createCourseSchema} = require("../../../validators/admin/course/course.schema");
const createHttpError = require("http-errors");
const {default: mongoose} = require("mongoose");
const {copyObjects, deleteInvalidPropertyObject, deleteFileInPublic, getTimeOfCourse} = require("../../../../utils/function");

class CourseController extends Controller {
    //
    async getListOfCourse(req, res, next) {
        try {
            const {search} = req.query;
            let courses;
            if (search)
                courses = await CourseModel.find({$text: {$search: search}})
                    .populate([
                        {path: "category", select: {title: 1}},
                        {path: "teacher", select: {first_name: 1, last_name: 1, mobile: 1, email: 1}},
                    ])
                    .sort({_id: -1}); // میاد و از آخرین رکورد برام میفرسته
            courses = await CourseModel.find({})
                .populate([
                    {path: "category", select: {children: 0, parent: 0}},
                    {path: "teacher", select: {first_name: 1, last_name: 1, mobile: 1, email: 1}},
                ])
                .sort({_id: -1}); // میاد و از آخرین رکورد برام میفرسته
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

    async findCoursById(id) {
        if (!mongoose.isObjectIdOrHexString(id)) throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمی باشد");
        console.log(id, "id");
        const course = await CourseModel.findById(id);
        if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");
        return course;
    }

    async getCourseById(req, res, next) {
        try {
            const {id} = req.params;
            const course = await CourseModel.findById(id);
            const time = getTimeOfCourse(course.chapters);
            if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.Ok,
                data: {course, time},
            });
        } catch (error) {
            next(error);
        }
    }

    async updateCourseById(req, res, next) {
        try {
            const {CourseId} = req.params;
            const course = await this.findCoursById(CourseId);
            const data = copyObjects(req.body);
            const {fileUploadPath, filename} = req.body;
            let blackListFields = ["items", "chapters", "episodes", "students", "bookmarks", "likes", "dislikes", "comments"];
            deleteInvalidPropertyObject(data, blackListFields);
            if (req.file) {
                data.image = path.join(fileUploadPath, filename);
                deleteFileInPublic(course.image);
            }
            return res.json({data});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {AbstractCourseController: CourseController, CourseController: new CourseController()};
module.exports = new CourseController();
