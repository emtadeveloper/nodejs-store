const {GraphQLObjectType, GraphQLString} = require("graphql");

const CategoryType = new GraphQLObjectType({
    name: "categoryType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
    },
});
module.exports = {CategoryType};
