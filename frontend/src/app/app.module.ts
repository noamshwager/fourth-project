import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { AboutDataComponent } from './components/home-area/about-data/about-data.component';
import { CartComponent } from './components/products-area/cart/cart.component';
import { CartItemCardComponent } from './components/products-area/cart-item-card/cart-item-card.component';
import { ShoppingComponent } from './components/shopping-area/shopping/shopping.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogExampleComponent } from './components/products-area/dialog-example/dialog-example.component';
import { OrderComponent } from './components/order-area/order/order.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { EditProductComponent } from './components/admin-area/edit-product/edit-product.component';
import { AdminProductListComponent } from './components/admin-area/admin-product-list/admin-product-list.component';
import { AdminProductCardComponent } from './components/admin-area/admin-product-card/admin-product-card.component';
import { AdminComponent } from './components/admin-area/admin/admin.component';
import { OrderCartComponent } from './components/order-area/order-cart/order-cart.component';
import { OrderCartItemCardComponent } from './components/order-area/order-cart-item-card/order-cart-item-card.component';
import { RegisterFinalComponent } from './components/auth-area/register-final/register-final.component';
import { RegisterInitialComponent } from './components/auth-area/register-initial/register-initial.component';
import { AboutDescriptionComponent } from './components/home-area/about-description/about-description.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { OrderAreaComponent } from './components/order-area/order-area/order-area.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { Page404Component } from './components/layout-area/page404/page404.component';

@NgModule({
    declarations: [
        LayoutComponent,
        ProductListComponent,
        ProductCardComponent,
        HeaderComponent,
        RegisterComponent,
        LoginComponent,
        LogoutComponent,
        HomeComponent,
        AboutDataComponent,
        CartComponent,
        CartItemCardComponent,
        ShoppingComponent,
        DialogExampleComponent,
        OrderComponent,
        EditProductComponent,
        AdminProductListComponent,
        AdminProductCardComponent,
        AdminComponent,
        OrderCartComponent,
        OrderCartItemCardComponent,
        RegisterFinalComponent,
        RegisterInitialComponent,
        AboutDescriptionComponent,
        OrderAreaComponent,
        Page404Component
    ],
    entryComponents:[DialogExampleComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS, // Register the interceptor
        useClass: JwtInterceptor, // Our interceptor class
        multi: true
    }],
    bootstrap: [LayoutComponent]
})
export class AppModule { }
