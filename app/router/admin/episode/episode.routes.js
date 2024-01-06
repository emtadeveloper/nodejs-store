const EpisodeController = require("../../../http/controllers/admin/course/episode.controller");
const {uploadVideo} = require("../../../utils/multer");

const router = require("express").Router();

console.log("log");

router.post("/add", uploadVideo.single("video"), EpisodeController.addNewEpisode);

module.exports = {
    AdminApiEpisodeRouter: router,
};
