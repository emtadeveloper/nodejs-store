const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt} = require("graphql");
const {AuthorType, PublicCategoryType} = require("./public.type");

const FeaturesType = new GraphQLObjectType({
    name: "features",
    fields: {
        length: {type: GraphQLString},
        height: {type: GraphQLString},
        width: {type: GraphQLString},
        wight: {type: GraphQLString},
        colors: {type: new GraphQLList(GraphQLString)},
        madein: {type: GraphQLString},
    },
});

const EpisodeType = new GraphQLObjectType({
    name: "EpisodeType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        type: {type: GraphQLString},
        time: {type: GraphQLString},
        videoAdress: {type: GraphQLString},
});

const ChapterType = new GraphQLObjectType({
    name: "ChapterType",
    fields: {
        _id: {type: GraphQLString},
        text: {type: GraphQLString},
        title: {type: GraphQLString},  
        episodes: {type: new GraphQLList(EpisodeType)},
    },
});

const CourseType = new GraphQLObjectType({
    name: "CourseType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        images: {type: new GraphQLList(GraphQLString)},
        imagesURL: {type: new GraphQLList(GraphQLString)},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCategoryType},
        price: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        count: {type: GraphQLInt},
        type: {type: GraphQLInt},
        supplier: {type: AuthorType},
        features: {type: FeaturesType},
        status: {type: GraphQLString},
        teacher: {type: AuthorType, ref: "user", required: true},
    },
});

module.exports = {CourseType};
