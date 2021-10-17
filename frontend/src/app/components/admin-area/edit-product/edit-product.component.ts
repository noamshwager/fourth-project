import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {

    public product = new ProductModel();
    public categories: CategoryModel[];
    private unsubscribeMe: Unsubscribe;
    public imageFlag:FileList;

    constructor(private myCategoriesService: CategoriesService, private myProductsService: ProductsService,private notify:NotifyService) { }

    async ngOnInit() {
        try{
            this.categories = await this.myCategoriesService.getAllCategories();
            this.unsubscribeMe = store.subscribe(() => {
                if (store.getState().productsState.editedProduct !== undefined) {
                    this.product = store.getState().productsState.editedProduct;
                }
            });
        }
        catch(err){
            this.notify.error(err);
        }
    }

    public saveImage(args: Event): void {
        if((args.target as HTMLInputElement).files){
        }
        this.product.productImageFile = (args.target as HTMLInputElement).files;
    }

    public async register() {

        try{
    
            const index = this.categories.findIndex(c => c._id === this.product.categoryId);
    
            this.product.category=new CategoryModel();
            this.product.category._id = this.product.categoryId;
            this.product.category.name = this.categories[index].name;
    
            const myFormData=ProductModel.convertToFormData(this.product);
    
            if (this.product._id !== undefined) {
                const updatedProduct = await this.myProductsService.updateProduct(myFormData);//update product
                this.notify.success("product updated");
            }
            else {
                const addedProduct = await this.myProductsService.addProduct(myFormData);//add product
                this.notify.success("product added");
            }
            this.imageFlag=undefined;
            this.product.name=undefined;
        }
        catch(err){
            this.notify.error(err);
        }
    }

    public async changeToAddProduct() {

        this.product._id = undefined;
        this.product.categoryId = "60f01ac4a3a0b66c39bb6b82";
        this.product.image = "";
        this.product.price = 0;
        this.product.name = "";

        this.imageFlag=undefined;
    }
    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
