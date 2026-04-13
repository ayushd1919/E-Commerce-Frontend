import { Routes } from "@angular/router";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductListComponent } from "./product-list/product-list.component";

export const PRODUCT_ROUTES: Routes = [
    {path: 'list', component: ProductListComponent},
    {path: 'detail/:id', component: ProductDetailComponent}
]