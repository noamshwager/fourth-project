require("../data-access-layer/dal");
const CartModel = require("../models/cart-model");
const UserModel = require("../models/user-model");

function getCartByUserIdAsync(userId) {
    return CartModel.findOne({ userId, isOpen: { $in: ["yes", "not yet"] } }).populate("user").exec();
}
function addCartAsync(cart) {
    return cart.save();
}
function closeCartAsync(cart) {
    return CartModel.updateOne({ _id: cart._id }, { $set: { isOpen: "no" } }).exec();
}
async function openCartAsync(cart) {
    await CartModel.updateOne({ _id: cart._id }, { $set: { isOpen: "yes" } }).exec();
    cart.isOpen = "yes";
    return cart;
}

module.exports = {
    getCartByUserIdAsync,
    addCartAsync,
    closeCartAsync,
    openCartAsync
}