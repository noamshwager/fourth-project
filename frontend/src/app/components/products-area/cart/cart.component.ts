import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { CartModel } from 'src/app/models/cart.model';
import { cartItemsDeletedAction } from 'src/app/redux/cart-items.state';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    public cartItems: CartItemModel[];
    public cart: CartModel;
    public totalPrice:number=0;//total cart price
    private unsubscribeMe: Unsubscribe;

    constructor(private notify: NotifyService) {
        this.cartItems = store.getState().cartItemsState.cartItems;//get all cart items
    }

    ngOnInit(): void {
        this.cartItems.forEach(c=>this.totalPrice+=c.totalPrice);
        this.unsubscribeMe = store.subscribe(() => {
            this.cartItems = store.getState().cartItemsState.cartItems;
            this.totalPrice=0;
            this.cartItems.forEach(c=>this.totalPrice+=c.totalPrice);
        });
    }

    public async deleteCartItems() {//delete all cart items
        try {
            store.dispatch(cartItemsDeletedAction());
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
