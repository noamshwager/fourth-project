const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Missing first name"],
        minlength: [2, "first name must be minimum 2 characters"],
        maxlength: [20, "first name can't exceed 20 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        minlength: [2, "last name must be minimum 2 characters"],
        maxlength: [20, "last name can't exceed 20 characters"]
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        minlength: [8, "email must be minimum 8 characters"],
        maxlength: [40, "email can't exceed 40 characters"]
    },
    id: {
        type: String,
        required: [true, "missing id"],
        minlength: [9, "id must be minimum 9 characters"],
        maxlength: [9, "id can't exceed 9 characters"]
    },
    password: {
        type: String,
        required: [true, "missing password"],
        minlength: [4, "password must be minimum 4 characters"],
    },
    city: {
        type: String,
        required: [true, "Missing city"],
        minlength:[2,"city must be minimum 2 characters"],
        maxlength:[40,"city can't exceed 40 characters"]
    },
    street: {
        type: String,
        required: [true, "Missing street"],
        minlength: [2, "street must be minimum 2 characters"],
        maxlength: [40, "street can't exceed 40 characters"]
    },
    isAdmin: String
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;