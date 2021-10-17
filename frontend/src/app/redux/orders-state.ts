import { OrderModel } from "../models/order.model";

export class OrdersState {
    public ordersAmount: number;
    public lastOrder: OrderModel;
}

export enum OrderActionType {
    ordersAmountDownloaded = "ordersAmountDownloaded",
    lastOrderDownloaded = "lastOrderDownloaded",
    orderAdded="orderAdded"
}

export interface OrderAction {
    type: OrderActionType;
    payload?: any;
}

export function ordersAmountDownloadedAction(ordersAmount: number): OrderAction {
    return { type: OrderActionType.ordersAmountDownloaded, payload: ordersAmount };
}
export function lastOrderDownloadedAction(order: OrderModel): OrderAction {
    return { type: OrderActionType.lastOrderDownloaded, payload: order };
}
export function orderAddedAction(): OrderAction {
    return { type: OrderActionType.orderAdded };
}

export function ordersReducer(currentState: OrdersState = new OrdersState(), action: OrderAction): OrdersState {
    const newState = { ...currentState };

    switch (action.type) {
        case OrderActionType.ordersAmountDownloaded:
            newState.ordersAmount = action.payload;
            break;
        case OrderActionType.lastOrderDownloaded:
            newState.lastOrder = action.payload;
            break;
        case OrderActionType.orderAdded:
            newState.ordersAmount++;
            break;
    }
    return newState;
}