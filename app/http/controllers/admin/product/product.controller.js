const Controller = require("../../controller");
const {createProductSchema} = require("../../../validators/admin/product/product.schema");
const path = require("path");
const {deleteFileInPublic, ListOfImagesFromRequest} = require("../../../../utils/function");
const {ProductModel} = require("../../../../models/product");
const {ObjectIdValidator} = require("../../../validators/public.validator");
const createHttpError = require("http-errors");

class ProductController extends Controller {
    //
    async addProduct(req, res, next) {
        try {
            const productBody = await createProductSchema.validateAsync(req.body);
            const images = ListOfImagesFromRequest(req?.files || [], req?.body.fileUploadPath);
            const {type, title, text, short_text, tags, category, price, discount, count, wight, length, height, width, colors} = productBody;
            const suplier = req.user._id;
            console.log(productBody.colors);
            let feture = {};
            // if (isNaN(width) || isNaN(height) || isNaN(length) || isNaN(wight)) {
            if (!width) feture.width = 0;
            else feture.width = width;
            if (!height) feture.height = 0;
            else feture.height = height;
            if (!length) feture.length = 0;
            else feture.length = length;
            if (!wight) feture.wight = 0;
            else feture.wight = wight;
            // }
            const product = await ProductModel.create({colors, type, title, text, short_text, tags, category, price, discount, count, images, feture, suplier});
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

    async getOneProduct(req, res, next) {
        try {
            const {id} = req.params;
            console.log(id);
            const product = await this.findProductById(id);
            console.log(product);
            if (!product) throw createHttpError.NotFound("محصولی یافت نشد");
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

    async removeProductById(req, res, next) {
        try {
            const {id} = req.params;
            const product = await this.findProductById(id);
            const removeProductResult = await ProductController.deleteOne({_id: product._id});
            if (removeProductResult.deleteCount == 0) throw createHttpError.BadRequest("حذف نشد");
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

    async findProductById(productID) {
        const {id} = await ObjectIdValidator.validateAsync({id: productID});
        const product = await ProductModel.findById(id);
        if (!product) throw createHttpError.NotFound("محصولی یافت نشد");
        return product;
    }
}

module.exports = new ProductController();
