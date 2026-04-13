import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { map, Observable } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  isAdmin    = false
  isCustomer = false
  productId!: number
  product$ = new Observable<Product>

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toastService: ToastService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productId = Number(id)
    this.isAdmin   = localStorage.getItem('role') === 'ADMIN'
    this.isCustomer = !!localStorage.getItem('user') && !this.isAdmin
    this.product$ = this.productService.getProductById(Number(id)).pipe(
      map(res => res.product)
    )
  }

  goBack() {
    this.isAdmin
      ? this.router.navigate(['/admin/products'])
      : this.router.navigate(['/home'])
  }

  addToCart(id: number) {
    this.cartService.addProduct(id, 1).subscribe({
      next: (res) => {
        this.toastService.show(res.message,'success')
      }
    })
  }
  editProduct() {
    this.router.navigate(['/admin/products/edit', this.productId])
  }
}
