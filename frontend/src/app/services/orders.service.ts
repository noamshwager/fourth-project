import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order.model';
import { ordersAmountDownloadedAction } from '../redux/orders-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    constructor(private http: HttpClient) { }

    public async addOrder(order: OrderModel) {
        const addedOrder = await this.http.post<OrderModel>(environment.ordersUrl, order).toPromise();
        return addedOrder;
    }
    public async getOrdersAmount() {
        if (store.getState().ordersState.ordersAmount === undefined) {
            const ordersAmount = await this.http.get<number>(environment.ordersUrl + "amount").toPromise();
            store.dispatch(ordersAmountDownloadedAction(ordersAmount));
        }
        return store.getState().ordersState.ordersAmount;
    }
    public async getLastOrder() {
        const lastOrder = await this.http.get<OrderModel>(environment.ordersUrl + "last-order/" + store.getState().authState.user._id).toPromise();
        return lastOrder;
    }
    public async getAllShippingDates() {
        const shippingDates = await this.http.get<OrderModel[]>(environment.ordersUrl + "shipping-dates").toPromise();
        return shippingDates;
    }

}
