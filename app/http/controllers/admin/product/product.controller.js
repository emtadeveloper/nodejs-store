const Controller = require("../../controller");
const {createProductSchema} = require("../../../validators/admin/product/product.schema");
const path = require("path");
const {deleteFileInPublic, ListOfImagesFromRequest, setFeature, copyObjects, ProductBlackList} = require("../../../../utils/function");
const {ProductModel} = require("../../../../models/product");
const {ObjectIdValidator} = require("../../../validators/public.validator");
const createHttpError = require("http-errors");
const {StatusCodes: HttpStatus} = require("http-status-codes");

class ProductController extends Controller {
    //
    async addProduct(req, res, next) {
        try {
            const productBody = await createProductSchema.validateAsync(req.body);
            const images = ListOfImagesFromRequest(req?.files || [], req?.body.fileUploadPath);
            const {type, title, text, short_text, tags, category, price, discount, count, colors} = productBody;
            const suplier = req.user._id;
            let fetures = setFeature(req.body);
            const product = await ProductModel.create({colors, type, title, text, short_text, tags, category, price, discount, count, images, fetures, suplier});
            return res.status(HttpStatus.CREATED).json({statucCode: HttpStatus.CREATED, message: "ثبت محصول با موفقیت انجام شد"});
        } catch (error) {
            const image = path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/g, "/");
            deleteFileInPublic(image);
            next(error);
        }
    }

    async editProduct(req, res, next) {
        try {
            const {id} = req.params;
            const product = await this.findProductById(id);
            const data = copyObjects(req.body);
            data.images = ListOfImagesFromRequest(req?.files || [], req?.body.fileUploadPath);
            data.fetures = setFeature(req.body);
            let blackListFields = Object.values(ProductBlackList);
            deleteInvalidPropertyObject(data, blackListFields); //  چون رفرنس تایپ هستش میاد و حذف میکنه و نیازی به تغیر دادن ما نیستش
            const updateProductResult = await ProductModel.updateOne({id: product._id}, {$set: data});
            if (updateProductResult.modifiedCount === 0) throw {status: HttpStatus.INTERNAL_SERVER_ERROR, message: "خطای داخلی "};
            return res.status(HttpStatus.OK).json({
                statucCode: HttpStatus.OK,
                message: "به روز رسانی با موفقیت انجام شد",
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const search = req?.query?.search || "";
            let product;
            if (search) {
                product = await ProductModel.find({
                    $text: {
                        $search: new RegExp(search, "ig"),
                    },
                });
            } else {
                product = await ProductModel.find({});
            }

            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
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
            const product = await this.findProductById(id);
            if (!product) throw createHttpError.NotFound("محصولی یافت نشد");
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
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
            return res.status(HttpStatus.OK).json({
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
