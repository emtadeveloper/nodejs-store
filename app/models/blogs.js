const {default: mongoose} = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: "users", required: true},
    comments: {type: String, required: true},
    createAt: {type: Date, default: new Date().getTime()},
    parent: {type: mongoose.Types.ObjectId},
});

const Schema = new mongoose.Schema(
    {
        author: {type: mongoose.Types.ObjectId, required: true, ref: "user"},
        title: {type: String, required: true},
        text: {type: String, required: true},
        short_text: {type: String, required: true},
        image: {type: String, required: true},
        tags: {type: [String], default: []},
        category: {type: [mongoose.Types.ObjectId], required: true},
        comments: {type: [CommentSchema], default: []},
        like: {type: [mongoose.Types.ObjectId], ref: "users", default: []},
        deslike: {type: [mongoose.Types.ObjectId], ref: "users", default: []},
        bookmark: {type: [mongoose.Types.ObjectId], ref: "users", default: []},
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

Schema.virtual("user", {
    ref: "user",
    localField: "_id",
    foreignField: "author",
});

Schema.virtual("category_detail", {
    ref: "category",
    localField: "_id",
    foreignField: "category",
});

module.exports = {
    BlogModel: mongoose.model("blog", Schema),
};
