import { CartModel } from "../models/cart.model";

export class CartState {
    public cart: CartModel;
    public constructor() {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
            this.cart = cart;
        }
    }
}

export enum CartActionType {
    cartDownloaded = "cartDownloaded",
    cartAdded = "cartAdded",
    cartUpdated = "cartUpdated",
    cartDeleted = "cartDeleted"
}

export interface CartAction {
    type: CartActionType;
    payload?: any;
}

export function cartDownloadedAction(cart: CartModel): CartAction {
    return { type: CartActionType.cartDownloaded, payload: cart };
}
export function cartAddedAction(cart: CartModel): CartAction {
    return { type: CartActionType.cartAdded, payload: cart };
}
export function cartUpdatedAction(cart: CartModel): CartAction {
    return { type: CartActionType.cartUpdated, payload: cart };
}
export function cartDeletedAction(): CartAction {
    return { type: CartActionType.cartDeleted };
}

export function cartReducer(currentState: CartState = new CartState(), action: CartAction): CartState {

    const newState = { ...currentState };

    switch (action.type) {
        case CartActionType.cartDownloaded:
            newState.cart = action.payload;
            break;
        case CartActionType.cartAdded:
            newState.cart = action.payload;
            localStorage.setItem("cart", JSON.stringify(newState.cart));
            break;
        case CartActionType.cartUpdated: {
            newState.cart = action.payload;
            localStorage.setItem("cart", JSON.stringify(newState.cart));
            break;
        }
        case CartActionType.cartDeleted: {
            newState.cart = null;
            localStorage.removeItem("cart");
            break;
        }
    }

    return newState;
}