const express = require("express");
const logic = require("../business-logic-layer/products-logic");
const ProductModel = require("../models/product-model");
const CategoryModel = require("../models/category-model");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");
const path = require("path");
const fs = require("fs");
const router = express.Router();

router.get("/", verifyLoggedIn, async (request, response) => {
    try {
        const products = await logic.getAllProductsAsync();
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/", verifyAdmin, async (request, response) => {// add product
    try {
        request.body.category = new CategoryModel(JSON.parse(request.body.category));//because of model
        const product = new ProductModel(request.body);

        const errors = product.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const addedProduct = await logic.addProductAsync(product, request.files ? request.files.productImageFile : null);//add product
        response.status(201).json(addedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.put("/:_id", verifyAdmin, async (request, response) => {//update product
    try {

        const _id = request.params._id;
        request.body._id = _id;//add _id to the body object(which is the product received from form)
        request.body.category = new CategoryModel(JSON.parse(request.body.category));//because of model
        const product = new ProductModel(request.body);

        const errors = product.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const updatedProduct = await logic.updateProductAsync(product, request.files ? request.files.productImageFile : null);//update product
        if (!updatedProduct) {
            response.status(404).send(`id ${_id} not found`);
            return;
        }
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/images/:image", (request, response) => {//route for getting images in order to display them
    try {
        const image = request.params.image;

        let imageFile = path.join(__dirname, "..", "images", "products", image);

        if (!fs.existsSync(imageFile)) imageFile = path.join(__dirname, "..", "images", "not-found.jpg");

        response.sendFile(imageFile);//return the image 

    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/amount", async (request, response) => {
    try {
        const productsAmount = await logic.getProductsAmountAsync();
        response.json(productsAmount);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;