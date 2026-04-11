import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable, reduce } from 'rxjs';
import { Order, OrderStatus } from '../../../core/models/order.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './order-detail.component.html',
  styleUrl: '../orders.component.css'
})
export class OrderDetailComponent implements OnInit{

  order$ = new Observable<Order>

  constructor(private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.order$ = this.orderService.getOrdersById(Number(id)).pipe(
      map(res => res.order)
    )
  }
  statusClass(status?: OrderStatus): string {
    const map: Record<string, string> = {
      pending:   's-pending',
      confirmed: 's-confirmed',
      delivered: 's-delivered',
      cancelled: 's-cancelled',
    }
    return map[status?.toLowerCase() ?? ''] ?? 's-pending'
  }

  statusTextClass(status: OrderStatus): string {
    const map: Record<string, string> = {
      confirmed: 'text-success',
      delivered: 'text-info',
      cancelled: 'text-danger',
      pending:   'text-warning',
    }
    return map[status?.toLowerCase()] ?? ''
  }

  get totalQty() {
    return this.order$.pipe(
      map(data => data.orderItems.reduce((acc, item) => acc + item.quantity, 0))
    )
  }
}
