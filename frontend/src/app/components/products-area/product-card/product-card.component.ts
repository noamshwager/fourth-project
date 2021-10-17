import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { environment } from 'src/environments/environment';
import store from 'src/app/redux/store';
import { cartItemAddedAction } from 'src/app/redux/cart-items.state';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    @Input()
    public product: ProductModel;

    public url: string;

    constructor(public dialog: MatDialog) { }

    openDialog() {//add cart item
        let dialogRef = this.dialog.open(DialogExampleComponent);

        dialogRef.afterClosed().subscribe(async (result) => {//result is the quantity selected in dialog
            if (result !== "false"&&result!==undefined) {
                
                const cartItem = new CartItemModel();
                cartItem.productId = this.product._id;
                
                cartItem.quantity = +result;
                cartItem.totalPrice = this.product.price * result;
                cartItem.product = this.product;
                cartItem.cartId = store.getState().cartState.cart._id;

                store.dispatch(cartItemAddedAction(cartItem));
            }

        });

    }

    ngOnInit(): void {
        this.url = environment.productsUrl+ "images/" + this.product.image;
    }

}
