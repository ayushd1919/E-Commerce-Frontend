import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../features/layouts/admin-layout/admin-layout.component';
import { AdminCustomerListComponent } from './customers/admin-customer-list/admin-customer-list.component';
import { AdminOrderListComponent } from './order/admin-order-list/admin-order-list.component';
import { AdminOrderDetailComponent } from './order/admin-order-detail/admin-order-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaxanomyComponent } from './taxanomy/taxanomy.component';
import { AdminProductListComponent } from './products/admin-product-list/admin-product-list.component';
import { AdminProductFormComponent } from './products/admin-product-form/admin-product-form.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: AdminProductListComponent, },
      {path: 'add-product', component: AdminProductFormComponent},
      { path: 'taxonomy', component: TaxanomyComponent },
      { path: 'customers', component: AdminCustomerListComponent },
      { path: 'orders', component: AdminOrderListComponent },
      { path: 'orders/:id', component: AdminOrderDetailComponent },
      { path: 'products/edit/:id', component: AdminProductFormComponent }
    ],
  },
];
