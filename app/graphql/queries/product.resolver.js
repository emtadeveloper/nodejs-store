const {ProductModel} = require("../../models/product");
const {BlogsType} = require("../typeDefs/blog.type");

const ProductResolver = {
    type: new GraphQLList(ProductType),
    resolve: async () => {
        return await ProductModel.find({}).populate([{path: "supplier"}, {path: "category"}]);
    },
};

module.exports = {ProductResolver};
