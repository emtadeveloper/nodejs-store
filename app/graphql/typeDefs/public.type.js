const {GraphQLString, GraphQLObjectType, GraphQLScalarType, GraphQLList} = require("graphql");
const {toObject, parseLiteral} = require("../utils");

const AnyType = new GraphQLScalarType({
    name: "anyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral,
});

const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    fields: {
        _id: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
    },
});

const PublicCategoryType = new GraphQLObjectType({
    name: "PublicCategoryType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
    },
});

const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: {
        _id: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
    },
});

module.exports = {CategoryType, PublicCategoryType, AuthorType, AnyType};
