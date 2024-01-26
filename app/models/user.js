const {default: mongoose} = require("mongoose");

const Schema = new mongoose.Schema(
    {
        first_name: {type: String},
        last_name: {type: String},
        username: {type: String},
        mobile: {type: String},
        email: {type: String},
        password: {type: String},
        otp: {type: Object, default: {code: 0, expiresIn: 0}},
        bills: {type: [], default: []},
        discount: {type: Number, default: 0},
        brithday: {type: String},
        Roles: {type: [String], default: ["user"]},
        courses: {type: [mongoose.Types.ObjectId], ref: "course", default: []},
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    },
);

Schema.index({first_name: "text", last_name: "text", username: "text", mobile: "text", mobile: "email"});

module.exports = {
    UserModel: mongoose.model("user", Schema),
};
