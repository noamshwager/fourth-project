import { CartItemModel } from "../models/cart-item.model";

export class CartItemsState {
    public cartItems: CartItemModel[] = [];
    public constructor() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        if (cartItems) {
            this.cartItems = cartItems;
        }
    }
}

export enum CartItemActionType {
    cartItemsDownloaded = "cartItemsDownloaded",
    cartItemAdded = "cartItemAdded",
    cartItemDeleted = "cartItemDeleted",
    cartItemsCleared = "cartItemsCleared",//when user logs out
    cartItemsDeleted = "cartItemsDeleted"
}

export interface CartItemAction {
    type: CartItemActionType;
    payload?: any;
}

export function cartItemsDownloadedAction(cartItems: CartItemModel[]): CartItemAction {
    return { type: CartItemActionType.cartItemsDownloaded, payload: cartItems };
}
export function cartItemAddedAction(cartItem: CartItemModel): CartItemAction {
    return { type: CartItemActionType.cartItemAdded, payload: cartItem };
}
export function cartItemDeletedAction(productId: string): CartItemAction {
    return { type: CartItemActionType.cartItemDeleted, payload: productId };
}
export function cartItemsClearedAction(): CartItemAction {
    return { type: CartItemActionType.cartItemsCleared };
}
export function cartItemsDeletedAction(): CartItemAction {
    return { type: CartItemActionType.cartItemsDeleted };
}

export function cartItemsReducer(currentState: CartItemsState = new CartItemsState(), action: CartItemAction): CartItemsState {

    const newState = { ...currentState };

    switch (action.type) {
        case CartItemActionType.cartItemsDownloaded:
            newState.cartItems = action.payload;
            localStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
            break;
        case CartItemActionType.cartItemAdded:
            const index = newState.cartItems.findIndex(c => c.productId === action.payload.productId);
            if (index !== -1) {
                newState.cartItems[index].quantity = newState.cartItems[index].quantity + action.payload.quantity;
                newState.cartItems[index].totalPrice = newState.cartItems[index].totalPrice + action.payload.totalPrice;
            }
            else {
                newState.cartItems.push(action.payload);
            }
            localStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
            break;
        case CartItemActionType.cartItemDeleted: {
            const index = newState.cartItems.findIndex(c => c.productId === action.payload);
            newState.cartItems.splice(index, 1);
            localStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
            break;
        }
        case CartItemActionType.cartItemsCleared:
            newState.cartItems = [];
            localStorage.removeItem("cartItems");
            break;
        case CartItemActionType.cartItemsDeleted:
            newState.cartItems = [];
            localStorage.setItem("cartItems", "[]");
            break;
    }

    return newState;
}