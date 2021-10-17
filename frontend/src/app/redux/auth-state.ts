import { UserModel } from "../models/user.model";

export class AuthState {
    public user: UserModel = null;
    public constructor() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.user = user;
        }
    }
    public finishedFirstRegistrationStage: string;
}

export enum AuthActionType {
    UserRegistered = "UserRegistered",
    UserLoggedIn = "UserLoggedIn",
    UserLoggedOut = "UserLoggedOut",
    UserFinishedFirstRegistrationStage = "UserFinishedFirstRegistrationStage",
    UserMovedToSecondRegistrationStage="UserMovedToSecondRegistrationStage"
}

export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

export function userRegisteredAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserRegistered, payload: user };
}
export function userLoggedInAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserLoggedIn, payload: user };
}
export function userLoggedOutAction(): AuthAction {
    return { type: AuthActionType.UserLoggedOut };
}
export function userFinishedFirstRegistrationStageAction(): AuthAction {//when first registration stage is finished
    return { type: AuthActionType.UserFinishedFirstRegistrationStage };
}
export function userMovedToSecondRegistrationStage(): AuthAction {//when second registration stage begins
    return { type: AuthActionType.UserMovedToSecondRegistrationStage };
}

export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.UserRegistered:
        case AuthActionType.UserLoggedIn:
            newState.user = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.user));
            break;
        case AuthActionType.UserLoggedOut:
            newState.user = null;
            localStorage.removeItem("user");
            break;
        case AuthActionType.UserFinishedFirstRegistrationStage:
            newState.finishedFirstRegistrationStage="yes";
            break;
        case AuthActionType.UserMovedToSecondRegistrationStage:
            newState.finishedFirstRegistrationStage="no";
            break;
    }
    return newState;
}