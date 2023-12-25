const Controller = require("../../controller");
const {createProductSchema} = require("../../../validators/admin/product/product.schema");
const path = require("path");
const {deleteFileInPublic, ListOfImagesFromRequest} = require("../../../../utils/function");
const {ProductModel} = require("../../../../models/product");

class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            const productBody = await createProductSchema.validateAsync(req.body);
            const image = ListOfImagesFromRequest(req?.files || [], req?.body.fileUploadPath);
            const {type, title, text, short_text, tags, category, price, discount, count, wight, length, height, width, colors} = productBody;
            const suplier = req.user._id;
            console.log(productBody.colors);
            let feture = {};
            if (isNaN(width) || isNaN(height) || isNaN(length) || isNaN(wight)) {
                if (!width) feture.width = 0;
                else feture.width = width;
                if (!height) feture.height = 0;
                else feture.height = height;
                if (!length) feture.length = 0;
                else feture.length = length;
                if (!wight) feture.wight = 0;
                else feture.wight = wight;
            }
            const product = await ProductModel.create({colors, type, title, text, short_text, tags, category, price, discount, count, image, feture, suplier});
            return res.json({statucCode: 201, message: "ثبت محصول با موفقیت انجام شد"});
        } catch (error) {
            const image = path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/g, "/");
            deleteFileInPublic(image);
            next(error);
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const product = await ProductModel.find({});
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    product,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();
