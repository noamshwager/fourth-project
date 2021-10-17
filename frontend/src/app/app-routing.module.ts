import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin-area/admin/admin.component';
import { EditProductComponent } from './components/admin-area/edit-product/edit-product.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { OrderAreaComponent } from './components/order-area/order-area/order-area.component';
import { CartComponent } from './components/products-area/cart/cart.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { OrderComponent } from './components/order-area/order/order.component';
import { ShoppingComponent } from './components/shopping-area/shopping/shopping.component';
import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';
import { UnAuthGuard } from './services/un-auth.guard';
import { Page404Component } from './components/layout-area/page404/page404.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "shopping-area", canActivate: [AuthGuard], component: ShoppingComponent },
    { path: "admin", canActivate: [AdminGuard], component: AdminComponent },
    { path: "order", canActivate: [AuthGuard], component: OrderAreaComponent },
    { path: "register", canActivate: [UnAuthGuard], component: RegisterComponent },
    { path: "logout", canActivate: [AuthGuard], component: LogoutComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", component: Page404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
