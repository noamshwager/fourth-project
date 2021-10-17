require("../data-access-layer/dal");
const ProductModel = require("../models/product-model");
const CategoryModel = require("../models/category-model");
const path=require("path");
const uuid=require("uuid");
const fs=require("fs");

function getAllProductsAsync() {
    return ProductModel.find().populate("category").exec();
}

async function addProductAsync(product,productImageFile) {
    if(productImageFile){
        const extension = productImageFile.name.substr(productImageFile.name.lastIndexOf("."));
        product.image = uuid.v4() + extension;
        const productImageFolder = path.join(__dirname, "..", "images", "products", product.image);
        await productImageFile.mv(productImageFolder);
    }
    return product.save();
}

async function updateProductAsync(product,productImageFile) {

    const productToUpdate=await ProductModel.findOne({_id:product._id}).exec();
    if (productImageFile !== null) {//delete existing image from images/vacations folder 
        const imageFileToDelete = path.join(__dirname, "..", "images", "products", productToUpdate.image);
        try {
            if (imageFileToDelete && fs.existsSync(imageFileToDelete)) {
                fs.unlinkSync(imageFileToDelete);
            }
        }
        catch (err) { console.log(err.message) }
    }

    if (productImageFile !== null) {//save new image in images/vacations folder
        const extension = productImageFile.name.substr(productImageFile.name.lastIndexOf("."));
        product.image = uuid.v4() + extension;
        const imageFileToSave = path.join(__dirname, "..", "images", "products", product.image);
        await productImageFile.mv(imageFileToSave);
    }
    const info = await ProductModel.updateOne({ _id: product._id }, product).exec();
    return info.n ? product : null;
}

function getProductsAmountAsync(){
    return ProductModel.count();
}

module.exports = {
    addProductAsync,
    updateProductAsync,
    getAllProductsAsync,
    getProductsAmountAsync
}