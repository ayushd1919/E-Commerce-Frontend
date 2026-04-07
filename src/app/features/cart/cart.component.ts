import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartRes } from '../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }
  cart!: CartRes
  
  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next:(res) => this.cart = res
    })
  }
}
