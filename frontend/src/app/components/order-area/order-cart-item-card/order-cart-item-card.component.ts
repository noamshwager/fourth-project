import { Component, Input, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from 'src/app/models/cart-item.model';
import store from 'src/app/redux/store';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-order-cart-item-card',
    templateUrl: './order-cart-item-card.component.html',
    styleUrls: ['./order-cart-item-card.component.css']
})
export class OrderCartItemCardComponent implements OnInit {

    @Input()
    public cartItem: CartItemModel;

    public url: string;
    public searchText: string;
    public backgroundColor: string;

    private unsubscribeMe: Unsubscribe;

    constructor() {
        this.searchText = store.getState().orderCartState.searchText;
        this.backgroundColor = "";
    }

    ngOnInit(): void {
        this.url = environment.productsUrl + "images/" + this.cartItem.product.image;
        this.unsubscribeMe = store.subscribe(() => {//mark name in yellow
            this.searchText = store.getState().orderCartState.searchText;
            if (this.cartItem.product.name.indexOf(this.searchText) !== -1 && this.searchText !== "") {
                this.backgroundColor = "yellow";
            }
            else {
                this.backgroundColor = "";
            }
        });
    }
    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
