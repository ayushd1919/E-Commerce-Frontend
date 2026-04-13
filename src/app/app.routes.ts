import { Routes } from '@angular/router';
import { CartComponent } from './features/cart/cart.component';
import { HomeComponent } from './features/home/home.component';

import { AUTH_ROUTES } from './features/auth/auth.routes';
import { ACCOUNT_ROUTES } from './features/account/account.routes';
import { CHECKOUT_ROUTES } from './features/checkout/checkout.routes';
import { PRODUCT_ROUTES } from './features/product/products.routes';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { adminLoadGuard } from './core/guards/admin-load.guard';
import { MainLayoutComponent } from './features/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './features/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
    {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent, canActivate: [authGuard] },
      { path: 'product', children: PRODUCT_ROUTES },
      { path: 'account', children: ACCOUNT_ROUTES, canActivate: [authGuard] },
      { path: 'checkout', children: CHECKOUT_ROUTES, canActivate: [authGuard] }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: AUTH_ROUTES
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    canMatch: [adminLoadGuard],
    loadChildren: () =>
      import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  }
];