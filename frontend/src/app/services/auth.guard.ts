import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { NotifyService } from './notify.service';

// Guard from entering or leaving a specific route in the front (not in the back)

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    public constructor(private myRouter: Router, private notify: NotifyService) { }

    public canActivate(route: ActivatedRouteSnapshot): boolean {
        
        // If user is logged-in: 
        if (store.getState().authState.user) {
            if (store.getState().authState.user.isAdmin === "yes" && route.url[0].path !== "logout") {
                this.notify.error("not a page for admin");
                this.myRouter.navigateByUrl("/home");
                return false;
            }
            if(route.url[0].path==="order"&&store.getState().cartState.cart.isOpen==="not yet"){
                this.notify.error("you have no open cart");
                this.myRouter.navigateByUrl("/home");
                return false;
            }
            return true; // You can enter the route
        }

        // If user isn't logged-in:
        this.notify.error("You must be logged in!!!")
        this.myRouter.navigateByUrl("/home");
        return false; // You can't enter the route
    }

}
