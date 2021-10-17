const mongoose = require("mongoose");

const CredentialsSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Missing email"],
        minlength: [8, "email must be minimum 8 characters"],
        maxlength: [40, "email can't exceed 40 characters"]
    },
    password: {
        type: String,
        required: [true, "missing password"],
        minlength: [4, "password must be minimum 4 characters"],
        maxlength:[25,"password can't exceed 25 characters"]
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

const CredentialsModel = mongoose.model("CredentialsModel", CredentialsSchema);

module.exports = CredentialsModel;