const {GraphQLList, GraphQLString} = require("graphql");
const {BlogModel} = require("../../models/blogs");
const {VerifyAccessTokenInGraphQL} = require("../middlewares/auhorization");
const {CourseType} = require("../typeDefs/course.type");
const {CourseModel} = require("../../models/course");

// npm i audit  fix --force   برای این که بیایم و اون آسیب پذیری ها که پکیج ها باهم دارند و کانفلیکت میخورند رو رفع کنیم از این استفاده میکنیم
// npm i graphql@^14.7.0 || ^15.3.0

const CourseResolver = {
    type: new GraphQLList(CourseType),
    args: {category: {type: GraphQLString}},
    resolve: async (_, args, context) => {
        const {req, res} = context;
        const {category} = args;
        const findQuery = category ? {category} : {};
        req.user = await VerifyAccessTokenInGraphQL(req);
        return await CourseModel.find(findQuery).populate([{path: "teacher"}, {path: "category"}]);
    },
};

module.exports = {CourseResolver};
