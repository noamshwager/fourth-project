const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    creationDate: Date,
    userId: mongoose.Schema.Types.ObjectId,
    isOpen:String
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

CartSchema.virtual("user", {
    ref: "UserModel",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

const CartModel = mongoose.model("CartModel", CartSchema, "carts");

module.exports = CartModel;