export class OrderCartState{
    public searchText:string;
}

export enum OrderCartActionType {
    searchTextChanged="searchTextChanged"
}

export interface OrderCartAction {
    type: OrderCartActionType;
    payload?: any;
}

export function searchTextChangedAction(searchText: string): OrderCartAction {
    return { type: OrderCartActionType.searchTextChanged, payload: searchText };
}

export function orderCartReducer(currentState: OrderCartState = new OrderCartState(), action: OrderCartAction): OrderCartState {
    const newState = { ...currentState };
    switch (action.type) {
        case OrderCartActionType.searchTextChanged:
            newState.searchText=action.payload;
            break;
    }
    return newState;
}