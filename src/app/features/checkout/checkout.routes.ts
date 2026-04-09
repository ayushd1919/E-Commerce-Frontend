import { Routes } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";
import { ConfirmComponent } from "./confirm/confirm.component";

export const CHECKOUT_ROUTES: Routes = [
    {path: '',pathMatch: 'full', component: CheckoutComponent},
    {path: 'confirm/:orderId', component: ConfirmComponent},
    {path: 'confirmation/:orderId',component: OrderConfirmationComponent}
]