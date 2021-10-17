import { Component, Input, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { cartItemDeletedAction } from 'src/app/redux/cart-items.state';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-cart-item-card',
    templateUrl: './cart-item-card.component.html',
    styleUrls: ['./cart-item-card.component.css']
})
export class CartItemCardComponent implements OnInit {

    @Input()
    public cartItem: CartItemModel;

    public url:string;

    constructor(private notify:NotifyService) { }

    public async deleteItemCard() {//delete cart item
        try {
            store.dispatch(cartItemDeletedAction(this.cartItem.productId));
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    ngOnInit(): void {
        this.url= environment.productsUrl+"images/"+this.cartItem.product.image;
    }

}
