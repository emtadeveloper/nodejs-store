const {ProductModel} = require("../../models/product");
const { categoryType } = require("../typeDefs/category");

const CategoriesResolver = {
    type: new GraphQLList(categoryType),
    resolve: async () => {
        return await ProductModel.find({}).populate([{path: "supplier"}, {path: "category"}]);
    },
};

module.exports = {ProductResolver};
