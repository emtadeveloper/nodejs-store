const {RoleController} = require("../../../http/controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../../http/middlewares/stringToArray");

const router = require("express").Router();

router.get("/list", RoleController.getAllRoles);
router.get("/add", stringToArray("permissions"), RoleController.createNewRole);

module.exports = {
    AdminApiRoleRouter: router,
};
