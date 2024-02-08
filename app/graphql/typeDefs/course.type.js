const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt} = require("graphql");
const {FeaturesType, AuthorType, PublicCategoryType} = require("./public.type");



const EpisodeType = new GraphQLObjectType({
    name: "EpisodeType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        type: {type: GraphQLString},
        time: {type: GraphQLString},
        videoAdress: {type: GraphQLString},
        videoURL: {type: GraphQLString},
    },
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
        image: {type: GraphQLString},
        imageURL: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCategoryType},
        price: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        count: {type: GraphQLInt},
        type: {type: GraphQLInt},
        supplier: {type: AuthorType},
        features: {type: FeaturesType},
        status: {type: GraphQLString},
        teacher: {type: AuthorType},
        chapters: {type: new GraphQLList(ChapterType)},
    },
});

module.exports = {CourseType};
