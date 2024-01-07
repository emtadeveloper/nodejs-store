const path = require("path");
const {createEpisedeSchema} = require("../../../validators/admin/course/course.schema");
const Controller = require("../../controller");
const {default: getVideoDurationInSeconds} = require("get-video-duration");
const {getTime} = require("../../../../utils/function");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const {CourseModel} = require("../../../../models/course");
const createHttpError = require("http-errors");
const {ObjectIdValidator} = require("../../../validators/public.validator");

class EpisodeController extends Controller {
    async addNewEpisode(req, res, next) {
        try {
            const {title, type, text, ChapterID, CourseID, filename, fileUploadPath} = await createEpisedeSchema.validateAsync(req.body);
            console.log(title, text, ChapterID, CourseID, filename, fileUploadPath);
            const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
            const secound = await getVideoDurationInSeconds(videoURL);
            const time = getTime(secound);
            const episode = {title, text, time, type, videoAddress};
            console.log(episode, CourseID, ChapterID);
            const createEpisodeResult = await CourseModel.updateOne({_id: CourseID, "chapters._id": ChapterID}, {$push: {"chapters.$.episodes": episode}});
            if (createEpisodeResult.modifiedCount === 0) throw new createHttpError.InternalServerError("افزودن اپیزود انجام نشد");
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "افزودن اپیزود با موفقیت انجام شد",
                },
            });
        } catch (error) {
            next(error);
        }
    }
    async removeEpisode(req, res, next) {
        try {
            const {id: episodeID} = await ObjectIdValidator.validateAsync({id: req.params.id});
            console.log(episodeID, "id");
            const removeEpisodeResult = await CourseModel.updateOne({"chapters.episodes._id": episodeID}, {$pull: {"chapters.$.episodes": {_id: episodeID}}});
            if (removeEpisodeResult.modifiedCount === 0) throw new createHttpError.InternalServerError("حذف اپیزود انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "حذف اپیزود با موفقیت انجام شد",
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new EpisodeController();