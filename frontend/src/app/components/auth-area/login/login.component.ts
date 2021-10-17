import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { CartModel } from 'src/app/models/cart.model';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    public credentials: CredentialsModel = new CredentialsModel();
    public user: UserModel;
    public cart: CartModel;
    public isOpen: string;//isOpen describes the state of the cart, "yes" means its open and the button will show "resume shopping" and "not yet" will make the "start shopping" button appear
    private unsubscribeMe: Unsubscribe;
    public lastOrder: OrderModel;

    constructor(private myRouter: Router, private myAuthService: AuthService, private myCartService: CartService, private myCartItemsService: CartItemsService, private notify: NotifyService, private myOrdersService: OrdersService) {
        this.user = store.getState().authState.user;
    }

    ngOnInit(): void {
        this.unsubscribeMe = store.subscribe(() => {
            this.user = store.getState().authState.user;//to know if the user is logged in, so I could show him the button instead of the form
        });
        if (this.isOpen === undefined) {
            if (localStorage.getItem("cart") !== null) {
                this.isOpen = JSON.parse(localStorage.getItem("cart")).isOpen;
            }
        }
    }

    public async login() {
        try {
            await this.myAuthService.login(this.credentials);//log in the user
            if (store.getState().authState.user !== undefined && store.getState().authState.user !== null && store.getState().authState.user.isAdmin === "no") {
                this.lastOrder = await this.myOrdersService.getLastOrder();//get the user last order, used in about-data component, to show his last purchase, in case his cart is closed, if its open it will show when was his cart open and if he doesn't have a last order and his cart is marked as "not yet" open it will show welcome and his name
                if (this.lastOrder === null) {
                    localStorage.setItem("lastOrder", "not existing");
                }
                else {
                    localStorage.setItem("lastOrder", JSON.stringify(this.lastOrder));
                }
            }
            if (store.getState().authState.user.isAdmin === "no") {//get the user cart and cart items, only if not admin
                await this.myCartService.getCart(this.user._id);//get the user cart or create it if thats he just registered
                this.isOpen = JSON.parse(localStorage.getItem("cart")).isOpen;//isOpen describes the state of the cart, "yes" means its open and the button will show "resume shopping" and "not yet" will make the "start shopping" button appear
                await this.myCartItemsService.getCartItems(store.getState().cartState.cart._id);
            }
            this.notify.success("Successfully logged in!");
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    public async openCart() {//if user clicks the "open cart", open his cart by marking it as open
        try {
            await this.myCartService.openCart(store.getState().cartState.cart);//open his cart
            this.myRouter.navigateByUrl("/shopping-area");
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    public showOpenCart() {
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
