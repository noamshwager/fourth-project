import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { cartItemsReducer } from "./cart-items.state";
import { cartReducer } from "./carts-state";
import { categoriesReducer } from "./categories-state";
import { orderCartReducer } from "./order-cart-state";
import { ordersReducer } from "./orders-state";
import { productsReducer } from "./products-state";

const reducers = combineReducers({
    authState: authReducer,
    categoriesState: categoriesReducer,
    productsState: productsReducer,
    cartState: cartReducer,
    cartItemsState: cartItemsReducer,
    orderCartState: orderCartReducer,
    ordersState:ordersReducer
})
const store = createStore(reducers);

export default store;