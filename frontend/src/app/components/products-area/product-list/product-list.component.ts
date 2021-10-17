import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    public categories: CategoryModel[];
    public products: ProductModel[];
    public search: string;

    constructor( private myCategoriesService: CategoriesService, private myProductsService: ProductsService, private notify: NotifyService) { }

    async ngOnInit() {
        try {
            await this.myProductsService.getAllProducts();//get all products
            this.categories = await this.myCategoriesService.getAllCategories();//get all categories
            this.products = store.getState().productsState.products.filter(p => p.categoryId === "60f01ac4a3a0b66c39bb6b82");//show products with "dairy" category
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    public async getProducts(args: any) {// for when user clicks a category, show products of that category
        try {
            
            const _id = args.currentTarget.getAttribute('value');//the way i found to get mat-button value because (args as HTMLButtonElement).value wasn't working
            
            if (_id === "all") {//show all products
                this.products = store.getState().productsState.products;
            }
            else {//show products by category
                this.products = store.getState().productsState.products.filter(p => p.categoryId === _id);
            }
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    public searchProducts() {//products by search
        this.products = store.getState().productsState.products.filter(p => p.name.indexOf(this.search) !== -1);
    }

}
