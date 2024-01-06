const {createEpisedeSchema} = require("../../../validators/admin/course/course.schema");
const Controller = require("../../controller");

class EpisodeController extends Controller {
    async addNewEpisode(req, res, next) {
        try {
            const {title, text, ChapterID, CourseID, filename, fileUploadPath} = await createEpisedeSchema.validateAsync(req.body);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new EpisodeController();
