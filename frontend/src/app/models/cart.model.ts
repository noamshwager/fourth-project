import { UserModel } from "./user.model";

export class CartModel {
    public _id: string;
    public userId: string;
    public user: UserModel;
    public creationDate: string;
    public isOpen: string;
}