const {AdminApiCategoryRouter} = require("./category/category.routes");
const {AdminApiBlogRouter} = require("./blog/blog.routes");
const {AdminApiCourseRouter} = require("./course/course.routes");
const {VerifyAccessToken} = require("../../http/middlewares/verifyAccessToken");
const {AdminApiProductRouter} = require("./Product/Product.routes");
const router = require("express").Router();

router.use("/product", AdminApiProductRouter);

router.use("/category", VerifyAccessToken, AdminApiCategoryRouter);

router.use("/blogs", VerifyAccessToken, AdminApiBlogRouter);

router.use("/courses", AdminApiCourseRouter);

module.exports = {
    adminRoutes: router,
};
