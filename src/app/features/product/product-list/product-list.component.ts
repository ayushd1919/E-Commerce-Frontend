import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { ProductCardComponent } from '../../../shared/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  product$!: Observable<Product[]>

  constructor(
    private productService: ProductService,
  ) {
    this.product$ = this.productService.getProducts().pipe(
      map(res => res.products))
  }

}
