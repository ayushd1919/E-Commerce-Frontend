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

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'auth', children: AUTH_ROUTES},
    { path: 'account', children: ACCOUNT_ROUTES, canActivate: [authGuard] },
    { path: 'cart', component: CartComponent, canActivate: [authGuard] },
    { path: 'checkout', children: CHECKOUT_ROUTES, canActivate: [authGuard] },
    { path: 'product', children: PRODUCT_ROUTES, canActivate: [authGuard] },
    { path: 'admin', loadChildren: () => import('./Admin/admin.routes').then(m => m.ADMIN_ROUTES), canActivate: [adminGuard], canMatch: [adminLoadGuard] }
];