import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Order, OrderStatus } from '../../../core/models/order.model';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule, RouterLink],
  templateUrl: './order-history.component.html',
  styleUrl: '../orders.component.css'
})
export class OrderHistoryComponent implements OnInit{

  order$!: Observable<Order[]>

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.order$ = this.orderService.getOrders().pipe(
      map((res) => res.orders)
    )
  }
  statusClass(status: OrderStatus): string {
    const map: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]:   's-pending',
      [OrderStatus.CONFIRMED]: 's-confirmed',
      [OrderStatus.CANCELLED]: 's-cancelled',
    }
    return map[status] ?? 's-pending'
  }
}
