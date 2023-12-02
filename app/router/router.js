const {HomeRoutes} = require("./api");
const {UserAuthRoutes} = require("./user/auth");
const router = require("express").Router();
const redisClient = require("../utils/init_redis");

(async () => {
    await redisClient.set("key", "value");
    const value = await redisClient.get("key");
    console.log(value);
})();
router.use("/", HomeRoutes);
router.use("/user", UserAuthRoutes);

module.exports = {
    AllRoutes: router,
};
