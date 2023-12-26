const productController = require("../../../http/controllers/admin/product/product.controller");
const {stringToArray} = require("../../../http/middlewares/stringToArray");
const {uploadFile} = require("../../../utils/multer");

const router = require("express").Router();

router.post("/add", uploadFile.array("images", 10), stringToArray("tags", "colors"), productController.addProduct);
router.patch("/edit/:id", uploadFile.array("images", 10), stringToArray("tags", "colors"), productController.editProduct);
router.get("/list", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);

module.exports = {
    AdminApiProductRouter: router,
};
