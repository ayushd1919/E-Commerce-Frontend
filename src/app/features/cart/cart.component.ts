import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../core/models/cart.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }
  cartItems$!: Observable<CartItem[] | undefined>
  grandTotal$!: Observable<number | undefined>

  ngOnInit(): void {
    this.cartService.getCart().subscribe()

    this.cartItems$ = this.cartService.cart$.pipe(
      map(res => res?.itemsWithTotals)
    )

    this.grandTotal$ = this.cartService.cart$.pipe(
      map(res => res?.grandTotal)
    )
  }

  decrement(productId: number){
    this.cartService.addProduct(productId,-1).subscribe()
  }
  increment(productId: number) {
    this.cartService.addProduct(productId,+1).subscribe()
  }
  removeItem(id: number) {
    this.cartService.removeProduct(id).subscribe()
  }
}
