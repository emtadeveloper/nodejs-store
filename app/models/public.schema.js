const {default: mongoose} = require("mongoose");


const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: "users", required: true},
    comments: {type: String, required: true},
    createAt: {type: Date, default: new Date().getTime()},
    parent: {type: mongoose.Types.ObjectId, ref: "comment"},
});

module.exports = {CommentSchema};
