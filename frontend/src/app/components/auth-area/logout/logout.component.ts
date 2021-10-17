import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cartItemsClearedAction } from 'src/app/redux/cart-items.state';
import { cartDeletedAction } from 'src/app/redux/carts-state';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-logout',
    template: ""
})
export class LogoutComponent implements OnInit {

    constructor(private myAuthService: AuthService, private myRouter: Router, private myCartItemsService: CartItemsService, private notify: NotifyService) { }

    async ngOnInit() {
        try {

            if (store.getState().authState.user.isAdmin === "no") {

                await this.myCartItemsService.deleteCartItems();//this and the next line saves current cart items
                await this.myCartItemsService.addCartItems(JSON.parse(localStorage.getItem("cartItems")));
                
                store.dispatch(cartItemsClearedAction());

                store.dispatch(cartDeletedAction());
                localStorage.removeItem("lastOrder");
            }
            await this.myAuthService.logout();//logout
            this.notify.success("You have successfully logged out!")
            this.myRouter.navigateByUrl("/home");
        }
        catch (err) {
            this.notify.error(err);
        }
    }

}
