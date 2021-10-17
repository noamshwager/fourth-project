import { CartModel } from "./cart.model";

export class OrderModel {
    public _id: string;
    public userId: string;
    public cartId: string;
    public cart: CartModel;
    public price: number;
    public city: string;
    public street: string;
    public shippingDate: string;
    public orderDate: string;
    public creditCard: string;
}