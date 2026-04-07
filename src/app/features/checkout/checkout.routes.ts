import { Routes } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";

export const CHECKOUT_ROUTES: Routes = [
    {path: '',pathMatch: 'full', component: CheckoutComponent},
    {path: 'confirm',component: OrderConfirmationComponent}
]