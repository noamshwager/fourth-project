const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    cartId: mongoose.Schema.Types.ObjectId,
    price: {
        type: Number,
        required: [true, "Missing price"]
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
        minlength:[2,"street must be minimum 2 characters"],
        maxlength:[40,"street can't exceed 40 characters"]
    },
    shippingDate: {
        type: Date,
        required: [true, "Missing shippingDate"]
    },
    orderDate: {
        type: Date,
        required: [true, "Missing orderDate"]
    },
    creditCard: {
        type: String,
        required: [true, "Missing credit card"],
        minlength:[16,"credit card must be minimum 16 characters"],
        maxlength:[16,"credit card can't exceed 16 characters"]
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

OrderSchema.virtual("user", {
    ref: "UserModel",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

OrderSchema.virtual("cart", {
    ref: "CartModel",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

const OrderModel = mongoose.model("OrderModel", OrderSchema, "orders");

module.exports = OrderModel;