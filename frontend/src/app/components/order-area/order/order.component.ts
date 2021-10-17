import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from 'src/app/models/order.model';
import { cartDeletedAction } from 'src/app/redux/carts-state';
import store from 'src/app/redux/store';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import jsPDF from "jspdf";
import { NotifyService } from 'src/app/services/notify.service';
import { orderAddedAction } from 'src/app/redux/orders-state';
import { cartItemsDownloadedAction } from 'src/app/redux/cart-items.state';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    public order = new OrderModel();
    public text: string;
    public shippingDates: OrderModel[];

    constructor(private myOrdersService: OrdersService, private myCartService: CartService, private myCartItemsService: CartItemsService, private myRouter: Router, private notify: NotifyService) {

    }

    async ngOnInit() {
        try {
            if (store.getState().cartItemsState.cartItems.length === 0) {
                this.notify.error("you have no cart items");
                this.myRouter.navigateByUrl("/home");
            }
            const date = new Date();
            let month;
            let day;
            date.getMonth() < 9 ? month = `0${(date.getMonth() + 1)}` : month = (date.getMonth() + 1);
            date.getDate() < 10 ? day = `0${date.getDate()}` : day = date.getDate();
            this.order.shippingDate = date.getFullYear() + "-" + month + "-" + day;

            this.shippingDates = await this.myOrdersService.getAllShippingDates();//get all shipping dates because of 3 shipping dates on same date limit
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    public fillCity(args: Event) {
        const name = (args.target as HTMLInputElement).name;
        name === "city" ? this.order.city = store.getState().authState.user.city : this.order.street = store.getState().authState.user.street;
    }


    public async addOrder() {
        try {
            let isDatePassed = "no";
            if (new Date().getFullYear() > new Date(this.order.shippingDate).getFullYear()) {
                isDatePassed = "yes";
            }
            if (new Date().getFullYear() === new Date(this.order.shippingDate).getFullYear() && new Date().getMonth() + 1 > new Date(this.order.shippingDate).getMonth() + 1) {
                isDatePassed = "yes";
            }
            if (new Date().getFullYear() === new Date(this.order.shippingDate).getFullYear() && new Date().getMonth() + 1 === new Date(this.order.shippingDate).getMonth() + 1 && new Date().getDate() > new Date(this.order.shippingDate).getDate()) {
                isDatePassed = "yes";
            }
            console.log(isDatePassed);
            if (isDatePassed === "no") {
                let shippingDateAmount = 0;
                let goodDateFormat = "";
                for (let s of this.shippingDates) {//check if there are already 3 orders this date
                    goodDateFormat = s.shippingDate.substr(0, s.shippingDate.indexOf("T"));
                    if (goodDateFormat === this.order.shippingDate) {
                        shippingDateAmount++;
                    }
                }
                if (shippingDateAmount < 3) {
                    this.order.userId = store.getState().authState.user._id;
                    this.order.cartId = store.getState().cartState.cart._id;
                    const date = new Date();
                    date.getMonth() < 9 ? this.order.orderDate = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate() : this.order.orderDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                    let price = 0;
                    store.getState().cartItemsState.cartItems.map(c => price += c.totalPrice);
                    this.order.price = price;

                    await this.myOrdersService.addOrder(this.order);//add order
                    if (store.getState().ordersState.ordersAmount !== undefined) {
                        store.dispatch(orderAddedAction());
                    }
                    else {
                        this.myOrdersService.getOrdersAmount();
                    }
                    localStorage.setItem("lastOrder", JSON.stringify(this.order));
                    let text = "receipt: \r\r";//text for receipt
                    let totalPrice = 0;
                    for (const c of JSON.parse(localStorage.getItem("cartItems"))) {
                        text += "product name: " + c.product.name + ", quantity: " + c.quantity + ", price: " + c.totalPrice + " $\r";
                        totalPrice += c.totalPrice;
                    }
                    text += "\rtotal price: " + totalPrice + " $";
                    await this.myCartItemsService.deleteCartItems();//this and the next line saves this order cart items
                    await this.myCartItemsService.addCartItems(JSON.parse(localStorage.getItem("cartItems")));
                    await this.myCartService.closeCart(store.getState().cartState.cart);//mark cart as closed
                    store.dispatch(cartDeletedAction());
                    await this.myCartService.getCart(store.getState().authState.user._id);//open new cart
                    store.dispatch(cartItemsDownloadedAction([]));
                    this.text = text;

                    this.notify.success("You have successfully ordered!");
                }
                else {
                    this.notify.error("too many orders this day, choose another one");
                }
            }
            else {
                this.notify.error("the date you selected has passed, choose another one");
            }

        }
        catch (err) {
            this.notify.error(err);
        }
    }

    public downloadPDF() {//download receipt
        const doc = new jsPDF();
        doc.text(this.text, 15, 15);
        doc.save("receipt.pdf");
    }

}
