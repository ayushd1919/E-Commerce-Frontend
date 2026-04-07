import { Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { OrderHistoryComponent } from "./order-history/order-history.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

export const ACCOUNT_ROUTES: Routes = [
    {path: '',pathMatch: 'full', component: ProfileComponent},
    {path: 'order-history', component: OrderHistoryComponent},
    {path: 'order-detail/:id', component: OrderDetailComponent},
    {path: 'change-password', component: ChangePasswordComponent}
] 