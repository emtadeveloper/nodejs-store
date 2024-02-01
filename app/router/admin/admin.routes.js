const {AdminApiCategoryRouter} = require("./category/category.routes");
const {AdminApiBlogRouter} = require("./blog/blog.routes");
const {AdminApiCourseRouter} = require("./course/course.routes");
const {VerifyAccessToken} = require("../../http/middlewares/verifyAccessToken");
const {AdminApiProductRouter} = require("./Product/Product.routes");
const {AdminApiChapterRouter} = require("./chapter/chapter.routes");
const {AdminApiEpisodeRouter} = require("./episode/episode.routes");
const {AdminApiRoleRouter} = require("./role/role.routes");
const {AdminApiPermissionRouter} = require("./pemission/pemission.routes");
const {AdminApiUserRouter} = require("./user/user.routes");
const {PERMISSIONS} = require("./../../utils/constans");
const { checkPermission } = require("../../http/middlewares/Permission.guard");
const router = require("express").Router();

router.use("/product", checkPermission([PERMISSIONS.SUPPLIER, PERMISSIONS.CONTENT_MANAGER]), AdminApiProductRouter);

router.use("/category", checkPermission([PERMISSIONS.CONTENT_MANAGER, PERMISSIONS.CONTENT_MANAGER]), VerifyAccessToken, AdminApiCategoryRouter);

router.use("/blogs", checkPermission([PERMISSIONS.TEACHER, PERMISSIONS.CONTENT_MANAGER]), VerifyAccessToken, AdminApiBlogRouter);

router.use("/courses", checkPermission([PERMISSIONS.TEACHER]), AdminApiCourseRouter);

router.use("/chapter", checkPermission([PERMISSIONS.TEACHER, PERMISSIONS.CONTENT_MANAGER]), AdminApiChapterRouter);

router.use("/episode", checkPermission([PERMISSIONS.TEACHER, PERMISSIONS.CONTENT_MANAGER]), AdminApiEpisodeRouter);

router.use("/role", checkPermission([PERMISSIONS.ADMIN]), AdminApiRoleRouter);

router.use("/permission", checkPermission([PERMISSIONS.ADMIN]), AdminApiPermissionRouter);

router.use("/user", checkPermission([PERMISSIONS.ADMIN]), AdminApiUserRouter);

module.exports = {
    adminRoutes: router,
};
