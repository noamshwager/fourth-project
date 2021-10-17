require("../data-access-layer/dal");
const CartItemModel = require("../models/cartItem-model");
const CartModel = require("../models/cart-model");
const ProductModel = require("../models/product-model");

function getCartItemsByCartIdAsync(cartId) {
    return CartItemModel.find({ cartId }).populate("product").exec();
}

function deleteCartItemsByCartId(cartId) {
    return CartItemModel.deleteMany({ cartId }).exec();
}

function addCartItemsAsync(cartItems) {
    const cartItemsGoodFormat = cartItems.map(c => new CartItemModel(c));
    return CartItemModel.insertMany(cartItemsGoodFormat);
}

module.exports = {
    getCartItemsByCartIdAsync,
    deleteCartItemsByCartId,
    addCartItemsAsync
}