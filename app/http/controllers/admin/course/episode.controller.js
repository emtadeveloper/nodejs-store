const path = require("path");
const {createEpisedeSchema} = require("../../../validators/admin/course/course.schema");
const Controller = require("../../controller");
const {default: getVideoDurationInSeconds} = require("get-video-duration");
const {getTime, deleteInvalidPropertyObject, copyObjects} = require("../../../../utils/function");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const {CourseModel} = require("../../../../models/course");
const createHttpError = require("http-errors");
const {ObjectIdValidator} = require("../../../validators/public.validator");

class EpisodeController extends Controller {
    async addNewEpisode(req, res, next) {
        try {
            const {title, type, text, ChapterID, CourseID, filename, fileUploadPath} = await createEpisedeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
            const secound = await getVideoDurationInSeconds(videoURL);
            const time = getTime(secound);
            const episode = {title, text, time, type, videoAddress};
            console.log(CourseID, ChapterID);
            const createEpisodeResult = await CourseModel.updateOne({_id: CourseID, "chapters._id": ChapterID}, {$push: {"chapters.$.episodes": episode}});
            console.log(createEpisodeResult);
            if (createEpisodeResult.modifiedCount === 0) throw new createHttpError.InternalServerError("افزودن اپیزود انجام نشد");
            return res.status(HttpStatus.CREATED).json({statusCode: HttpStatus.CREATED, data: {message: "افزودن اپیزود با موفقیت انجام شد"}});
        } catch (error) {
            next(error);
        }
    }

    async updateEpidode(req, res, next) {
        try {
            const {episodeID} = req.params;
            const episode = await this.getOneEpisode(episodeID);
            const {filename, fileUploadPath} = req.body;
            let blackListFields = ["_id"];
            if (filename && fileUploadPath) {
                const fileAddress = path.join(fileUploadPath, filename);
                req.body.videoAddress = fileAddress.replace(/\\/g, "/");
                const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`;
                const seconds = await getVideoDurationInSeconds(videoURL);
                req.body.time = getTime(seconds);
                blackListFields.push("filename");
                blackListFields.push("fileUploadPath");
            } else {
                blackListFields.push("time");
                blackListFields.push("videoAddress");
            }
            const data = req.body;
            deleteInvalidPropertyObject(data, blackListFields);
            const newEpisode = {...episode, ...data};
            const editEpisodeResult = await CourseModel.updateOne({"chapters.episodes._id": episodeID}, {$set: {"chapters.$.episodes": newEpisode}});
            console.log({editEpisodeResult});
            if (!editEpisodeResult.modifiedCount) throw new createHttpError.InternalServerError("ویرایش اپیزود انجام نشد");
            return res.status(HttpStatus.OK).json({statusCode: HttpStatus.OK, data: {message: "ویرایش اپیزود با موفقیت انجام شد"}});
        } catch (error) {
            next(error);
        }
    }

    // وقتی یک چیزی رو آپدیت میکنیم آیدی اشم میاد و عوض میشه و باید حواسمون باشه آیدی قبلی نداشته باشیم

    async getOneEpisode(episodeID) {
        console.log({episodeID});
        const course = await CourseModel.findOne({"chapters.episodes._id": episodeID}, {"chapters.$": 1});
        if (!course) throw new createHttpError.NotFound("اپیزودی یافت نشد");
        const episode = await course?.chapters?.[0]?.episodes?.[0];
        console.log({course});
        if (!episode) throw new createHttpError.NotFound("اپیزودی یافت نشد");
        return copyObjects(episode);
    }

    async removeEpisode(req, res, next) {
        try {
            const {id: episodeID} = await ObjectIdValidator.validateAsync({id: req.params.episodeID});
            const removeEpisodeResult = await CourseModel.updateOne({"chapters.episodes._id": episodeID}, {$pull: {"chapters.$.episodes": {_id: episodeID}}});
            if (removeEpisodeResult.modifiedCount === 0) throw new createHttpError.InternalServerError("حذف اپیزود انجام نشد");
            return res.status(HttpStatus.OK).json({statusCode: HttpStatus.OK, data: {message: "حذف اپیزود با موفقیت انجام شد"}});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new EpisodeController();
