import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-admin-product-list',
    templateUrl: './admin-product-list.component.html',
    styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit, OnDestroy {

    public categories: CategoryModel[];
    public products: ProductModel[];
    public unsubscribeMe: Unsubscribe;
    public categoryId: string;

    constructor( private myCategoriesService: CategoriesService, private myProductsService: ProductsService, private notify: NotifyService) {

    }

    async ngOnInit() {
        try {
            await this.myProductsService.getAllProducts();//get all products
            this.categories = await this.myCategoriesService.getAllCategories();//get all category
            this.categoryId = "60f01ac4a3a0b66c39bb6b82";
            this.products = store.getState().productsState.products.filter(p => p.categoryId === this.categoryId);
            this.unsubscribeMe = store.subscribe(() => {
                if (this.categoryId !== "all") {
                    this.products = store.getState().productsState.products.filter(p => p.categoryId === this.categoryId);
                }
            });
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    public async getProducts(args: any) {
        try {

            this.categoryId = args.currentTarget.getAttribute('value');

            if (this.categoryId === "all") {
                this.products = store.getState().productsState.products;
            }
            else {
                this.products = store.getState().productsState.products.filter(p => p.categoryId === this.categoryId);
            }

        }
        catch (err) {
            this.notify.error(err);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }




}
