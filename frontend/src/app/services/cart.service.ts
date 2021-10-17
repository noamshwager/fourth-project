import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartModel } from '../models/cart.model';
import { cartAddedAction, cartDeletedAction, cartDownloadedAction, cartUpdatedAction } from '../redux/carts-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private http: HttpClient) { }

    public async getCart(userId: string) {
        let cart = await this.http.get<CartModel>(environment.cartUrl + "by-user/" + userId).toPromise();
        console.log(cart);
        if (cart === null) {
            const date = new Date();
            const goodDateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            cart = await this.http.post<CartModel>(environment.cartUrl, { userId, creationDate: goodDateFormat, isOpen: "not yet" }).toPromise();
        }
        console.log(cart);
        store.dispatch(cartAddedAction(cart));
        return cart;
    }

    public async closeCart(cart: CartModel) {
        await this.http.patch(environment.cartUrl, cart).toPromise();
        return;
    }
    public async openCart(cart: CartModel) {
        let updatedCart = await this.http.patch<CartModel>(environment.cartUrl + "open/", cart).toPromise();
        store.dispatch(cartUpdatedAction(updatedCart));
        return;
    }
}
