import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products$!: Observable<Product[]>

  constructor(private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.products$ = this.route.queryParamMap.pipe(
      switchMap(params => {
        const typeId = params.get('typeId')
        const categoryId = params.get('categoryId')

        this.productService.getProducts(typeId,categoryId)
      })
    )
  }



}
