const {HomeRoutes} = require("./api");
const {UserAuthRoutes} = require("./user/auth");
const {adminRoutes} = require("./admin/admin.router");
const router = require("express").Router();
const redisClient = require("../utils/init_redis");
const {DeveloperRoutes} = require("./developer.routes");
const {VerifyAccessToken, checkRole} = require("../http/middlewares/verifyAccessToken");

(async () => {
    await redisClient.set("key", "value");
    const value = await redisClient.get("key");
    console.log(value);
})();

router.use("/", HomeRoutes);
router.use("/user", UserAuthRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/admin", VerifyAccessToken, checkRole("ADMIN"), adminRoutes);

module.exports = {
    AllRoutes: router,
};
