import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import { userMovedToSecondRegistrationStage } from 'src/app/redux/auth-state';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-register-final',
    templateUrl: './register-final.component.html',
    styleUrls: ['./register-final.component.css']
})
export class RegisterFinalComponent implements OnInit,OnDestroy {

    public user = new UserModel();
    private unsubscribeMe: Unsubscribe;

    constructor(
        private myAuthService: AuthService,
        private myRouter: Router,
        private myCartService: CartService,
        private myCartItemsService: CartItemsService,
        private notify: NotifyService) { }

    ngOnInit(): void {
        this.unsubscribeMe = store.subscribe(() => {
            if (store.getState().authState.finishedFirstRegistrationStage === "yes" && localStorage.getItem("credentials") !== null) {
                this.user = JSON.parse(localStorage.getItem("credentials"));
                localStorage.removeItem("credentials");
                store.dispatch(userMovedToSecondRegistrationStage());
            }
        });
    }

    public async register() {
        try {
            this.user.isAdmin = "no";
            await this.myAuthService.register(this.user);//register user
            await this.myCartService.getCart(store.getState().authState.user._id);//create new cart
            await this.myCartItemsService.getCartItems(store.getState().cartState.cart._id);
            localStorage.setItem("lastOrder", "not existing");
            this.notify.success("You have been successfully registered!");
            this.myRouter.navigateByUrl("/home");
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    ngOnDestroy():void{
        this.unsubscribeMe();
    }


}
