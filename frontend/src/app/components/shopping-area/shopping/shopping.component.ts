import { Component, OnInit } from '@angular/core';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-shopping',
    templateUrl: './shopping.component.html',
    styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

    public cart: string = "30%";
    public products: string = "60%";
    public border:string="2px solid black";
    public margin:string="2.5%";

    constructor(private myCartService: CartService,private notify:NotifyService) { }

    async ngOnInit() {
        try{
            if (store.getState().cartState.cart.isOpen === "not yet") {//in case user cart was not open but he searched this route in url
                await this.myCartService.openCart(store.getState().cartState.cart);
            }
        }
        catch(err){
            this.notify.error(err);
        }
    }
    public minimize() {
        if (this.cart === "30%") {
            this.cart = "0";
            this.border="0";
            this.margin="0";
            this.products = "95%";
        }
        else {
            this.cart = "30%";
            this.products = "60%";
            this.border="2px solid black";
            this.margin="2.5%";
        }
    }

}
