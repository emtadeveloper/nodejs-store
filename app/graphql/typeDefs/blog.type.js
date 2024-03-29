const {GraphQLObjectType, GraphQLString, GraphQLList} = require("graphql");
const {AuthorType, PublicCategoryType} = require("./public.type");

const BlogsType = new GraphQLObjectType({
    name: "blogType",
    fields: {
        _id: {type: GraphQLString},
        author: {type: AuthorType},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        image: {type: GraphQLString},
        imageURL: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCategoryType},
    },
});

module.exports = {BlogsType};
