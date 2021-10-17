import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CredentialsModel } from '../models/credentials.model';
import { UserModel } from '../models/user.model';
import { userLoggedInAction, userLoggedOutAction, userRegisteredAction } from '../redux/auth-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    public async register(user: UserModel) {
        const addedUser = await this.http.post<UserModel>(environment.authUrl+"register/", user).toPromise();
        store.dispatch(userRegisteredAction(addedUser));
        return addedUser;
    }

    public async login(credentials: CredentialsModel) {
        const loggedInUser = await this.http.post<UserModel>(environment.authUrl + "login/", credentials).toPromise();
        store.dispatch(userLoggedInAction(loggedInUser));
        return loggedInUser;
    }

    public logout() {
        store.dispatch(userLoggedOutAction());
    }

    public async getAllIds(){
        const ids=await this.http.get<UserModel[]>(environment.authUrl+"id").toPromise();
        return ids;
    }
}
