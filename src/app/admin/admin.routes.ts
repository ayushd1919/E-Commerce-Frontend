import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { AdminProductListComponent } from "./products/admin-product-list/admin-product-list.component";
import { AdminProductFormComponent } from "./products/admin-product-form/admin-product-form.component";
import { AdminCustomerListComponent } from "./customers/admin-customer-list/admin-customer-list.component";
import { AdminOrderListComponent } from "./order/admin-order-list/admin-order-list.component";
import { AdminOrderDetailComponent } from "./order/admin-order-detail/admin-order-detail.component";

export const ADMIN_ROUTES: Routes = [{
    path: '', pathMatch: 'full', component: AdminLayoutComponent,
    children: [
        { path: '', pathMatch: 'full', redirectTo: 'products' },
        { path: 'products', component: AdminProductListComponent },
        { path: 'products/new', component: AdminProductFormComponent },
        { path: 'customers', component: AdminCustomerListComponent },
        { path: 'orders', component: AdminOrderListComponent },
        { path: 'orders/:id', component: AdminOrderDetailComponent }
    ]
}]