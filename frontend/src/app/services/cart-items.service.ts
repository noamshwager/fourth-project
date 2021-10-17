import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItemModel } from '../models/cart-item.model';
import { CartModel } from '../models/cart.model';
import { cartItemsDownloadedAction } from '../redux/cart-items.state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CartItemsService {

    constructor(private http: HttpClient) { }

    public async deleteCartItems() {
        await this.http.delete(environment.cartItemsUrl+"by-cart/" + JSON.parse(localStorage.getItem("cart"))._id).toPromise();
        return;
    }
    
    public async addCartItems(cartItems: CartItemModel[]) {
        const addedCartItems = await this.http.post<CartItemModel[]>(environment.cartItemsUrl+"add-cart-items", cartItems).toPromise();
        return addedCartItems;
    }

    public async getCartItems(cartId: string) {
        let cartItems = await this.http.get<CartItemModel[]>(environment.cartItemsUrl+"by-cart/" + cartId).toPromise();
        store.dispatch(cartItemsDownloadedAction(cartItems));
        return cartItems;
    }
}
