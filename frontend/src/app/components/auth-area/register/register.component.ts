import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent{

    public user = new UserModel();

    constructor() { }


}
