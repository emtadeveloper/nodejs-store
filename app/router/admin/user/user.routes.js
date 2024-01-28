const userController = require("../../../http/controllers/admin/user/user.controller");

const router = require("express").Router();

router.get("/list", userController.getAllUsers);

router.patch("/update-profile", userController.updateUserProfile);

router.get("/profile", userController.UserProfile);

module.exports = {
    AdminApiUserRouter: router,
};
