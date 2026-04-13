import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { FilterPanelComponent } from "../../../shared/filter-panel/filter-panel.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductListComponent } from "../../../features/product/product-list/product-list.component";
import { AdminProductFormComponent } from "../admin-product-form/admin-product-form.component";

@Component({
  selector: 'app-admin-product-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ProductListComponent, AdminProductFormComponent, RouterLink],
  templateUrl: './admin-product-list.component.html',
  styleUrl: './admin-product-list.component.css'
})
export class AdminProductListComponent{
  showForm       = false
  editingProduct : Product | null = null

openForm(product: Product | null = null) {
  this.editingProduct = product
  this.showForm = true
}

closeForm() {
  this.showForm = false
  this.editingProduct = null
}

onSaved() {
  this.closeForm()
}
}
