import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-confirmation',
  imports: [CommonModule, RouterLink],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent implements OnInit {

  order$!: Observable<Order | undefined>
  grandTotal$!: Observable<number | undefined>
  orderId!: string | null

  constructor(private orderService: OrderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')

    this.order$ = this.orderService.getOrdersById(Number(this.orderId)).pipe(
      map(res => res.order)
    )
  }
}
