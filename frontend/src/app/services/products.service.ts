import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';
import { productAddedAction, productsAmountDownloadedAction, productsDownloadedAction, productUpdatedAction } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    public async getAllProducts() {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        return store.getState().productsState.products;
    }

    public async addProduct(product: FormData) {
        const addedProduct = await this.http.post<ProductModel>(environment.productsUrl, product).toPromise();
        store.dispatch(productAddedAction(addedProduct));
        return addedProduct;
    }
    public async updateProduct(product: FormData) {
        const updatedProduct = await this.http.put<ProductModel>(`${environment.productsUrl}${product.get("_id")}`, product).toPromise();
        store.dispatch(productUpdatedAction(updatedProduct));
        return updatedProduct;
    }
    public async getProductsAmount() {
        if (store.getState().productsState.productsAmount === undefined) {
            const productsAmount = await this.http.get<number>(environment.productsUrl + "amount").toPromise();
            store.dispatch(productsAmountDownloadedAction(productsAmount));
        }
        return store.getState().productsState.productsAmount;
    }

}
