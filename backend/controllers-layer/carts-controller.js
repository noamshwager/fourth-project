const express = require("express");
const logic = require("../business-logic-layer/carts-logic");
const CartModel = require("../models/cart-model");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin=require("../middleware/verify-admin");
const router = express.Router();

router.get("/by-user/:userId", verifyLoggedIn,async (request, response) => {//get cart
    try {
        const userId = request.params.userId;
        const cart = await logic.getCartByUserIdAsync(userId);
        response.json(cart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
router.post("/", verifyLoggedIn,async (request, response) => {//add cart
    try {
        const cart = new CartModel(request.body);
        const addedCart = await logic.addCartAsync(cart);
        response.status(201).json(addedCart);
    }
    catch (err) {

        response.status(500).send(err.message);
    }
});

router.patch("/", verifyLoggedIn,async (request, response) => {//mark cart as closed
    try {
        const cart=request.body;
        const updatedCart = await logic.closeCartAsync(cart);
        response.status(200).json(updatedCart);
    }
    catch (err) {

        response.status(500).send(err.message);
    }
});
router.patch("/open", verifyLoggedIn,async (request, response) => {//mark cart as open
    try {
        const cart=request.body;
        const updatedCart = await logic.openCartAsync(cart);
        response.status(200).json(updatedCart);
    }
    catch (err) {

        response.status(500).send(err.message);
    }
});

module.exports = router;