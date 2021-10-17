import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { NotifyService } from './notify.service';

// Guard from entering or leaving a specific route in the front (not in the back)

@Injectable({
    providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {

    public constructor( private myRouter: Router,private notify:NotifyService) { }

    public canActivate(): boolean {

        if (!store.getState().authState.user)
            return true; // You can enter the route

        this.notify.error("You are already logged in!!!")
        this.myRouter.navigateByUrl("/home");
        return false; // You can't enter the route
    }

}
