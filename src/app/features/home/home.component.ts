import { Component } from '@angular/core';
import { FilterPanelComponent } from "../../shared/filter-panel/filter-panel.component";
import { ProductListComponent } from "../product/product-list/product-list.component";

@Component({
  selector: 'app-home',
  imports: [FilterPanelComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
