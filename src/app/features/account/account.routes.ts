import { Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { AddressesComponent } from "./addresses/addresses.component";
import { OrderHistoryComponent } from "./order-history/order-history.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";

export const ACCOUNT_ROUTES: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      { path: 'edit', component: EditProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'my-orders', component: OrderHistoryComponent },
      { path: 'my-orders/:id', component: OrderDetailComponent }
    ]
  }
]