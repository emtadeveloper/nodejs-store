const router = require("express").Router();
const bcrypt = require("bcrypt");
const {numberRandomGenerator} = require("../../utils/function");

router.get("/password-hash/:password", (req, res, next) => {
    const {password} = req.params;
    const salt = bcrypt.genSaltSync(10);
    return res.send(bcrypt.hashSync(password, salt));
});

router.get("/random-number", (req, res, next) => {
    return res.send(numberRandomGenerator().toString());
});

module.exports = {DeveloperRoutes: router};
