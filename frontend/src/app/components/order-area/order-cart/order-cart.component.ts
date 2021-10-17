import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { OrderModel } from 'src/app/models/order.model';
import { searchTextChangedAction } from 'src/app/redux/order-cart-state';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-order-cart',
    templateUrl: './order-cart.component.html',
    styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent implements OnInit, OnDestroy {

    public cartItems: CartItemModel[];
    public search: string;
    public totalPrice: number = 0;
    public lastOrder: OrderModel;
    public isOrderFinished: string;
    private unsubscribeMe: Unsubscribe;

    constructor() {
    }

    ngOnInit(): void {
        this.cartItems = store.getState().cartItemsState.cartItems;
        this.cartItems.forEach(c => this.totalPrice += c.totalPrice);
        console.log(localStorage.getItem("lastOrder"));
        if(localStorage.getItem("lastOrder")!=="not existing"){
            this.lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
        }
        this.unsubscribeMe = store.subscribe(() => {
            console.log(localStorage.getItem("lastOrder"));
            if(localStorage.getItem("lastOrder")&&localStorage.getItem("lastOrder")!=="not existing"){
                console.log("test");
                console.log(localStorage.getItem("lastOrder"));
                console.log(this.lastOrder);
                if(this.lastOrder===undefined&&localStorage.getItem("lastOrder")!=="not existing"){
                    this.isOrderFinished="yes";
                }
                if (this.lastOrder&&JSON.parse(localStorage.getItem("lastOrder")).cartId !== this.lastOrder.cartId) {
                    this.isOrderFinished = "yes";//this will make the go back to shop button disappear because after order is finished i want the user to go to home page
                }
            }
        });
    }
    public searchReceipt() {//search receipt
        store.dispatch(searchTextChangedAction(this.search));
    }
    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
