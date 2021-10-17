import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartModel } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-about-data',
    templateUrl: './about-data.component.html',
    styleUrls: ['./about-data.component.css']
})
export class AboutDataComponent implements OnInit, OnDestroy {

    public productsAmount: number;
    public ordersAmount: number;
    public cart: CartModel;
    public lastOrder: OrderModel;
    public user: UserModel;
    public isFirstOrder: string;
    public goodCreationDate:string;
    public goodLastOrderDate:string;
    private unsubscribeMe: Unsubscribe;

    constructor(private myProductsService: ProductsService, private myOrdersService: OrdersService, private notify: NotifyService) {
        this.cart = store.getState().cartState.cart;
        this.user = store.getState().authState.user;
    }

    async ngOnInit() {
        try {
            this.productsAmount = await this.myProductsService.getProductsAmount();
            this.ordersAmount = await this.myOrdersService.getOrdersAmount();
            this.unsubscribeMe = store.subscribe(async () => {
                this.user = store.getState().authState.user;
                this.cart = store.getState().cartState.cart;
                if (localStorage.getItem("lastOrder") === "not existing") {
                    this.isFirstOrder = localStorage.getItem("lastOrder");//if user registered and didn't order or open cart yet
                }
                else {
                    this.lastOrder = JSON.parse(localStorage.getItem("lastOrder"));//if user registered or logged in and ordered or his cart is open
                }
                if(this.cart){
                    if (this.cart.creationDate.indexOf("T") !== -1) {
                        this.goodCreationDate = "";
                        const date = new Date(this.cart.creationDate);
                        let month="";
                        let day;
                        console.log(date.getMonth());
                        date.getMonth() < 9 ? month = `0${date.getMonth() + 1}` : month = `${date.getMonth() + 1}`;
                        date.getDate() < 10 ? day = `0${date.getDate()}` : day = date.getDate();
                        this.goodCreationDate = date.getFullYear() + "-" + month + "-" + day;
                        console.log(this.goodCreationDate);
                    }
                }
                if(this.lastOrder){
                    if(this.lastOrder.orderDate.indexOf("T")!==-1){
                        this.goodLastOrderDate="";
                        const orderDate=new Date(this.lastOrder.orderDate);
                        let orderMonth="";
                        let orderDay;
                        orderDate.getMonth() < 9 ? orderMonth = `0${orderDate.getMonth() + 1}` : orderMonth = `${orderDate.getMonth() + 1}`;
                        orderDate.getDate() < 10 ? orderDay = `0${orderDate.getDate()}` : orderDay = orderDate.getDate();
                        this.goodLastOrderDate = orderDate.getFullYear() + "-" + orderMonth + "-" + orderDay;
                    }
                    else{
                        this.goodLastOrderDate=this.lastOrder.orderDate;
                    }
                }
            });
            if (localStorage.getItem("lastOrder") === "not existing") {
                this.isFirstOrder = localStorage.getItem("lastOrder");
            }
            else {
                this.lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
            }
            if(this.lastOrder){
                if(this.lastOrder.orderDate.indexOf("T")!==-1){
                    this.goodLastOrderDate="";
                    const orderDate=new Date(this.lastOrder.orderDate);
                    let orderMonth="";
                    let orderDay;
                    orderDate.getMonth() < 9 ? orderMonth = `0${orderDate.getMonth() + 1}` : orderMonth = `${orderDate.getMonth() + 1}`;
                    orderDate.getDate() < 10 ? orderDay = `0${orderDate.getDate()}` : orderDay = orderDate.getDate();
                    this.goodLastOrderDate = orderDate.getFullYear() + "-" + orderMonth + "-" + orderDay;
                }
                else{
                    this.goodLastOrderDate=this.lastOrder.orderDate;
                }
            }
            if (this.cart) {
                console.log(new Date(this.cart.creationDate));
                if (this.cart.creationDate.indexOf("T") !== -1) {
                    this.goodCreationDate = "";
                    const date = new Date(this.cart.creationDate);
                    let month="";
                    let day;
                    console.log(date.getMonth());
                    date.getMonth() < 9 ? month = `0${date.getMonth() + 1}` : month = `${date.getMonth() + 1}`;
                    date.getDate() < 10 ? day = `0${date.getDate()}` : day = date.getDate();
                    this.goodCreationDate = date.getFullYear() + "-" + month + "-" + day;
                    console.log(this.goodCreationDate);
                }
            }
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
