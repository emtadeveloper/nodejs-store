const {GraphQLList, GraphQLString} = require("graphql");
const {categoryModel} = require("../../models/categories");
const {CategoryType} = require("../typeDefs/category");

const CategoriesResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        field: {types: GraphQLString},
        auhorizationToken: {types: GraphQLString},
    },
    resolve: async (object, args, context, info) => {
        console.log(args);
        console.log(context);
        const Categories = await categoryModel.find({parent: undefined});
        return Categories;
    },
};

const CategoryChildResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        parent: {types: GraphQLString},
    },
    resolve: async (object, args, context, info) => {
        const {parent} = args;
        const Categories = await categoryModel.find({parent});
        return Categories;
    },
};

module.exports = {CategoryChildResolver, CategoriesResolver};
