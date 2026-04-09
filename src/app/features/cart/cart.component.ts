import { Component, numberAttribute, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';
import { CartItem } from '../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }
  cartItems$!: Observable<CartItem[]>
  grandTotal!: Observable<number>

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCart().pipe(
      map((res) => res.itemsWithTotals)
    )
    this.grandTotal = this.cartService.getCart().pipe(
      map((res) => res.grandTotal)
    )
  }

  decrement(id: number){
    this.cartService.addProduct(id,-1).subscribe()
  }
  increment(id: number) {
    this.cartService.addProduct(id,+1).subscribe()
  }
  removeItem(id: number) {
    this.cartService.removeProduct(id).subscribe()
  }
  proceedToCheckout(){}
}
