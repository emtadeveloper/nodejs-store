const {default: mongoose} = require("mongoose");
const {CommentSchema} = require("./public.schema");

const Schema = new mongoose.Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    colors: {type: [String], required: true},
    images: {type: [String], required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    comments: {type: [CommentSchema], required: true},
    likes: {type: [mongoose.Types.ObjectId], default: []},
    deslikes: {type: [mongoose.Types.ObjectId], default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], default: []},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    count: {type: Number},
    type: {type: String, required: true}, //  مجازی یا فیزکی هستش
    time: {type: String}, //  اگر ویدویی باشه تایم اشو مشخص میکنیم
    format: {type: String}, // نوع
    suplier: {type: mongoose.Types.ObjectId, required: true, ref: "user"},
    fetures: {
        type: Object,
        default: {length: "", height: "", width: "", wight: ""},
    },
});

Schema.index({title: "text", short_text: "text", text: "text"}); // بالا بردن سرعت سرچ

Schema.virtual("imageURL").get(function () {
    return this.images.map(image => `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${image}`);
});

module.exports = {
    ProductModel: mongoose.model("product", Schema),
};
