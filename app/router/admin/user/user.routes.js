const userController = require("../../../http/controllers/admin/user/user.controller");

const router = require("express").Router();

router.get("/list", userController.getAllUsers);

module.exports = {
    AdminApiUserRouter: router,
};
