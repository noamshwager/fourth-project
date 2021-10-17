const express = require("express");
const logic = require("../business-logic-layer/orders-logic");
const OrderModel = require("../models/order-model");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const router = express.Router();

router.post("/", verifyLoggedIn, async (request, response) => {// add order
    try {
        const order = new OrderModel(request.body);

        const errors = order.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const addedOrder = await logic.addOrderAsync(order);
        response.status(201).json(addedOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/amount", async (request, response) => {
    try {
        const ordersAmount = await logic.getOrdersAmountAsync();
        response.json(ordersAmount);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
router.get("/last-order/:userId",verifyLoggedIn ,async (request, response) => {
    try {
        const userId = request.params.userId;
        const lastOrder = await logic.getLastOrderAsync(userId);
        response.json(lastOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/shipping-dates",verifyLoggedIn ,async(request,response)=>{//get all shipping dates-used for validation to not allow to ship an order in a day that already has 3
    try{
        const shippingDates=await logic.getAllShippingDatesAsync();
        response.json(shippingDates);
    }
    catch(err){
        response.status(500).send(err.message);
    }
});

module.exports = router;