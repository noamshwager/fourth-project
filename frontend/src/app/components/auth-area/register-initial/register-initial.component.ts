import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { userFinishedFirstRegistrationStageAction } from 'src/app/redux/auth-state';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-register-initial',
    templateUrl: './register-initial.component.html',
    styleUrls: ['./register-initial.component.css']
})
export class RegisterInitialComponent implements OnInit {

    public user = new UserModel();
    public isComplete: string;
    public ids: UserModel[];
    public confirmPassword: string;

    constructor(private notify: NotifyService, private myAuthService: AuthService) { }

    public async register() {
        try {
            const isIdExisting = this.ids.findIndex(id => id.id === this.user.id);
            let errors = "";
            if (this.confirmPassword !== this.user.password) {
                errors += "passwords don't match";
            }

            if (isIdExisting === -1) {
                if (errors === "") {
                    localStorage.setItem("credentials", JSON.stringify(this.user));
                    store.dispatch(userFinishedFirstRegistrationStageAction());//close this registration screen and open the next
                    this.isComplete = "yes";
                }
            }
            else {
                if (errors !== "") {
                    errors += ", ";
                }
                errors += "id already existing";
            }
            if (errors !== "") {
                this.notify.error(errors);
            }
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    async ngOnInit() {
        try {
            this.ids = await this.myAuthService.getAllIds();
        }
        catch (err) {
            this.notify.error(err);
        }
    }

}
