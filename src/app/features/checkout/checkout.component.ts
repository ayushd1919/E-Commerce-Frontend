import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { map, Observable, tap } from 'rxjs';
import { CartItem } from '../../core/models/cart.model';
import { Address } from '../../core/models/address.model';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { Router, RouterLink } from "@angular/router";
import { OrderService } from '../../core/services/order.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  deliveryForm!: FormGroup

  constructor(private cartService: CartService,
    private userService: UserService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.deliveryForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    })
  }

  cartItems$!: Observable<CartItem[] | undefined>
  grandTotal$!: Observable<number | undefined>
  addresses$!: Observable<Address[]>
  profile$!: Observable<User>

  ngOnInit(): void {
    this.cartService.getCart().subscribe()

    this.cartItems$ = this.cartService.cart$.pipe(
      map(res => res?.itemsWithTotals)
    )

    this.grandTotal$ = this.cartService.cart$.pipe(
      map(res => res?.grandTotal)
    )

    this.addresses$ = this.userService.getAddress().pipe(
      map((res) => res.addresses)
    )

    this.profile$ = this.userService.geProfile().pipe(
      map((res) => res.profile),
      tap((user) => {
        if (user) {
          this.deliveryForm.patchValue({
            name: user.name,
            mobile: user.mobile
          })
        }
      })
    )
    this.profile$.subscribe()
  }
  saveAndContinue() {
    this.orderService.placeOrder(this.deliveryForm.value).subscribe({
      next: (res) => {
        this.toastService.show(res.message, 'success')
        setTimeout(() => {
          this.router.navigate([`/checkout/confirm/${res.order.id}`])
        }, 10);
      }
    })
  }
}
