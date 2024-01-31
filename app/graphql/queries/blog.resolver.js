const {BlogModel} = require("../../models/blogs");
const {BlogsType} = require("../typeDefs/blog.type");

const BlogResolver = {
    type: new GraphQLList(BlogsType),
    resolve: async () => {
        return await BlogModel.find({}).populate([{path: "author"}, {path: "category"}]);
    },
};

module.exports = BlogResolver;
