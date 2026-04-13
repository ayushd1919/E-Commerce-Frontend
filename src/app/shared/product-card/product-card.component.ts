import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
import { ImageFallbackDirective } from '../image-fallback/image-fallback.directive';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink, ImageFallbackDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product
  isAdmin = false

  constructor(
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('role') === 'ADMIN'
    this.product.subCategory.category.type.name
  }

  addToCart(id: number) {
    this.cartService.addProduct(id, 1).subscribe({
      next: (res) => this.toastService.show(res.message, 'success')
    })
  }
}