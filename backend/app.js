global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const fileUpload=require("express-fileupload");
const ProductsController = require("./controllers-layer/products-controller");
const CartItemsController = require("./controllers-layer/cart-items-controller");
const CartsController = require("./controllers-layer/carts-controller");
const OrdersController = require("./controllers-layer/orders-controller");
const CategoriesController = require("./controllers-layer/categories-controller");
const AuthController = require("./controllers-layer/auth-controller");
const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload());
server.use("/api/products", ProductsController);
server.use("/api/cart-items", CartItemsController);
server.use("/api/carts", CartsController);
server.use("/api/orders", OrdersController);
server.use("/api/categories", CategoriesController);
server.use("/api/auth", AuthController);

server.listen(3001, () => console.log("Listening..."));