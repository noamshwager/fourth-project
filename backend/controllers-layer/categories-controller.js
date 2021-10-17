const express = require("express");
const logic = require("../business-logic-layer/categories-logic");
const CategoryModel = require("../models/category-model");
const verifyLoggedIn=require("../middleware/verify-logged-in");
const router = express.Router();

router.get("/", verifyLoggedIn,async (request, response) => {
    try {
        const categories = await logic.getAllCategoriesAsync();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;