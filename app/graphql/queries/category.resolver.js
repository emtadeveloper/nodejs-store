const {GraphQLList, GraphQLString} = require("graphql");
const {categoryModel} = require("../../models/categories");
const {CategoryType} = require("../typeDefs/category");

const CategoriesResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        field: {type: GraphQLString},
        auhorizationToken: {type: GraphQLString},
    },
    resolve: async (object, args, context, info) => {
        console.log(args);
        const Categories = await categoryModel.find({parent: undefined});
        return Categories;
    },
};

const CategoryChildResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        parent: {type: GraphQLString},
    },
    resolve: async (object, args, context, info) => {
        const {parent} = args;
        const Categories = await categoryModel.find({parent});
        return Categories;
    },
};

module.exports = {CategoriesResolver, CategoryChildResolver};
