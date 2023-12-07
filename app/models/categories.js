const {default: mongoose} = require("mongoose");

const Schema = new mongoose.Schema({
    title: {type: String, require: true},
    parent: {type: mongoose.Types.ObjectId, default: undefined},
});

module.exports = {
    categoryModel: mongoose.model("category", Schema),
};
