const {default: mongoose} = require("mongoose");
const {CommentSchema} = require("./public.schema");

const Episodes = mongoose.Schema({
    title: {type: String, require: true},
    text: {type: String, require: true},
    type: {type: String, default: "unlock"},
    time: {type: String, require: true},
    videoAddress: {type: String, require: true},
});

const Chapter = mongoose.Schema({
    title: {type: String, require: true},
    text: {type: String, default: ""},
    episodes: {type: [Episodes], default: []},
});

const Schema = new mongoose.Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: [String], required: true},
    status: {type: String, default: "notStarted"} /** notStarted holding */,
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    comments: {type: [CommentSchema], required: true},
    likes: {type: [mongoose.Types.ObjectId], default: []},
    deslikes: {type: [mongoose.Types.ObjectId], default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], default: []},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    type: {type: String, default: "free", /** free cash special */ required: true}, //  مجازی یا فیزکی هستش
    time: {type: String, default: "00.00.00"}, //  اگر ویدویی باشه تایم اشو مشخص میکنیم
    format: {type: String}, // نوع
    teacher: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    chapters: {type: [Chapter], default: []},
    students: {type: [mongoose.Types.ObjectId], default: [], ref: "user"},
});

Schema.index({title: "text", short_text: "text", text: "text"});

module.exports = {
    CourseModel: mongoose.model("course", Schema),
};
