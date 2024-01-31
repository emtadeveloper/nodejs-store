const {HomeRoutes} = require("./api/index.routes");
const {UserAuthRoutes} = require("./user/auth.routes");
const {adminRoutes} = require("./admin/admin.routes");
const {AdminApiCourseRouter} = require("./admin/course/course.routes");
const router = require("express").Router();
const redisClient = require("../utils/init_redis");
const {DeveloperRoutes} = require("./developer/developer.routes");
const {VerifyAccessToken, checkRole} = require("../http/middlewares/verifyAccessToken");
const {graphqlHTTP} = require("express-graphql");
const {graphQLSchema} = require("../graphql/index.graphql");

(async () => {
    await redisClient.set("key", "value");
    const value = await redisClient.get("key");
    console.log(value);
})();

router.use("/", HomeRoutes);
router.use("/user", UserAuthRoutes);
router.use("/developer", DeveloperRoutes);

// router.use("/courses", VerifyAccessToken, checkRole("ADMIN"), AdminApiCourseRouter);
// router.use("/admin", VerifyAccessToken, checkRole("ADMIN"), adminRoutes);

router.use("/courses", VerifyAccessToken, AdminApiCourseRouter);
router.use("/admin", VerifyAccessToken, adminRoutes);

router.use("/graphql", graphqlHTTP(graphqlConfig));

module.exports = {
    AllRoutes: router,
};
pla;
