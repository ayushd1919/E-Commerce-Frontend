import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-product-card',
  imports: [ CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product!: Product

  constructor(private cartService: CartService,
    private toastService: ToastService
  ) {}
  
  addToCart(id: number) {
    this.cartService.addProduct(id, 1).subscribe({
      next: (res) => {
        this.toastService.show(res.message,'success')
      }
    })
  }
}
