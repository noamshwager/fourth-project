const express = require("express");
const logic = require("../business-logic-layer/cart-items-logic");
const CartItemModel = require("../models/cartItem-model");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const router = express.Router();

router.get("/by-cart/:cartId", verifyLoggedIn, async (request, response) => {//get all cart items with that cartId
    try {
        const cartId = request.params.cartId;
        const cartItems = await logic.getCartItemsByCartIdAsync(cartId);
        response.json(cartItems);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.delete("/by-cart/:cartId", verifyLoggedIn, async (request, response) => {//delete all cart items of that cartId, every time a user logs out i delete all his previous cart items and save all his new ones(in the next route)
    try {
        const cartId = request.params.cartId;
        await logic.deleteCartItemsByCartId(cartId);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/add-cart-items", verifyLoggedIn, async (request, response) => {//add cart items, used when a user logs out, i delete all his previous cart items(previous route) and save all his new ones
    try {
        let cartItems = request.body;
        const addedCartItems = await logic.addCartItemsAsync(cartItems);
        response.status(201).json(addedCartItems);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;