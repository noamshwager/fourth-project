import { CategoryModel } from "./category.model";

export class ProductModel {
    public _id: string;
    public name: string;
    public price: number;
    public image: string;
    public categoryId: string;
    public category: CategoryModel;
    public productImageFile?: FileList;

    public static convertToFormData(product: ProductModel): FormData {
        const myFormData = new FormData();
        if(product._id) myFormData.append("_id",product._id);
        myFormData.append("categoryId", product.categoryId);
        myFormData.append("name", product.name);
        myFormData.append("price", product.price.toString());
        myFormData.append("category", JSON.stringify(product.category));
        if (product.productImageFile) myFormData.append("productImageFile", product.productImageFile.item(0));
        return myFormData;
    }
}