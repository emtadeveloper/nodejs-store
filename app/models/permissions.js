const {default: mongoose} = require("mongoose");

const Permissionschema = mongoose.Schema(
    {
        name: {type: String, unique: true},
        description: {type: String, default: ""},
    },
    {toJSON: {virtuals: true}},
);

module.exports = {
    PermissionsModel: mongoose.model("permissions", Permissionschema),
};
