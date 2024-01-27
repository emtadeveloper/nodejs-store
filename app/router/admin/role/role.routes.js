const {RoleController} = require("../../../http/controllers/admin/RBAC/role.controller");
const {stringToArray} = require("../../../http/middlewares/stringToArray");

const router = require("express").Router();

router.get("/list", RoleController.getAllRoles);
router.post("/add", stringToArray("permissions"), RoleController.createNewRole);
router.patch("/update/:id", RoleController.updateRoleByID);
router.delete("/remove/:field", RoleController.removeRole);

module.exports = {
    AdminApiRoleRouter: router,
};
