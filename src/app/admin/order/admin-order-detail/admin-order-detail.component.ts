import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order, OrderStatus } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-order-detail',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-order-detail.component.html',
  styleUrl: './admin-order-detail.component.css'
})
export class AdminOrderDetailComponent {
  order$ = new Observable<Order>

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.order$ = this.adminService.getOrderById(Number(id)).pipe(
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
