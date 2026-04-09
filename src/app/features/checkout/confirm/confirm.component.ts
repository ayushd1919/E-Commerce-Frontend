import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { map, Observable, take, tap } from 'rxjs';
import { Address } from '../../../core/models/address.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrderItem, PaymentMethod } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-confirm',
  imports: [CommonModule, RouterLink],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css', '../checkout.component.css']
})
export class ConfirmComponent implements OnInit {

  selectedAddressId!: string
  selectedPayment!: PaymentMethod
  PaymentMethod = [
    { value: PaymentMethod.DEBIT_CARD, label: 'Debit Cart' },
    { value: PaymentMethod.CREDIT_CARD, label: 'Credit Cart' },
    { value: PaymentMethod.UPI, label: 'UPI' },
    { value: PaymentMethod.CASH, label: 'Cash' },
  ]
  orderItems$!: Observable<OrderItem[] | undefined>
  grandTotal$!: Observable<number | undefined>
  addresses$!: Observable<Address[]>
  orderId: string | null = null

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')

    this.addresses$ = this.userService.getAddress().pipe(
      map((res) => res.addresses)
    )
    
    const orderObs = this.orderService.getOrdersById(Number(this.orderId));

    this.orderItems$ = orderObs.pipe(
      map(res => res.order.orderItems)
    );

    this.grandTotal$ = orderObs.pipe(
      map(res => res.order.totalAmount)
    )
  }

  placeOrder() {
    this.orderService.confirmOrder(Number(this.orderId), Number(this.selectedAddressId), this.selectedPayment).subscribe({
      next: (res) => {
        this.toastService.show(res.message, 'success')
        setTimeout(() => {
          this.router.navigate([`/checkout/confirmation/${res.order.id}`])
        }, 10);
      }
    })
  }
}