import { Component, OnInit,Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { editedProductSelectedAction } from 'src/app/redux/products-state';
import store from 'src/app/redux/store';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-admin-product-card',
    templateUrl: './admin-product-card.component.html',
    styleUrls: ['./admin-product-card.component.css']
})
export class AdminProductCardComponent implements OnInit {

    @Input()
    public product: ProductModel;

    public url:string;

    constructor() { }

    ngOnInit(): void {
        this.url= environment.productsUrl+"images/"+this.product.image;
    }
    public async editProduct() {
        const duplicatedProduct={...this.product};
        store.dispatch(editedProductSelectedAction(duplicatedProduct));
    }

}
