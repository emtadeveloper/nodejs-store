const {graphQLSchema} = require("../graphql/index.graphql");

// باعث انعطاف پذیری بیشتر دیتای ما می شود

function graphqlConfig(req, res) {
    return {
        schema: graphQLSchema,
        graphiql: true, // playGrund برای فعال سازی
        context: {req, res},
    };
}
module.exports = {graphqlConfig};
