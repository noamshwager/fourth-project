import { CartModel } from "./cart.model";
import { ProductModel } from "./product.model";

export class CartItemModel {
    public _id: string;
    public productId: string;
    public product: ProductModel;
    public quantity: number;
    public totalPrice: number;
    public cartId: string;
    public cart: CartModel;
}