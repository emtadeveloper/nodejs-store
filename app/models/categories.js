const {default: mongoose} = require("mongoose");

const Schema = new mongoose.Schema(
    {
        title: {type: String, require: true},
        parent: {type: mongoose.Types.ObjectId, default: undefined, ref: "category"},
    },
    {
        id: false,
        toJSON: {
            virtuals: true,
        },
    },
);

Schema.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent",
});

function autoPopulate(next) {
    this.populate([{path: "children", select: {__v: 0, _id: 0}}]);
    next();
}

Schema.pre("findOne", autoPopulate).pre("find", autoPopulate);

module.exports = {
    categoryModel: mongoose.model("category", Schema),
};
