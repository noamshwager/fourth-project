require("../data-access-layer/dal");
const OrderModel = require("../models/order-model");
const UserModel = require("../models/user-model");
const CartModel = require("../models/cart-model");

function addOrderAsync(order) {
    return order.save();
}

function getOrdersAmountAsync(){
    return OrderModel.count();
}

function getLastOrderAsync(userId){
    return OrderModel.findOne({userId}).sort({"orderDate":-1}).limit(1);//return order of a user with most recent date
}

function getAllShippingDatesAsync(){
    return OrderModel.find({},{shippingDate:1,_id:0}).exec();//return all shipping dates without returning _id field
}

module.exports={
    addOrderAsync,
    getOrdersAmountAsync,
    getLastOrderAsync,
    getAllShippingDatesAsync
}