const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength:[2,"name must be minimum 2 characters"],
        maxlength:[20,"name can't exceed 20 characters"]
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min:[0,"price can't be negative"]
    },
    image: String,
    categoryId: mongoose.Schema.Types.ObjectId
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

ProductSchema.virtual("category", {
    ref: "CategoryModel",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;