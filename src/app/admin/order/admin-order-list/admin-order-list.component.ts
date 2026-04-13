import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Order, OrderStatus } from '../../../core/models/order.model';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-order-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-order-list.component.html',
  styleUrl: '../../admin.component.css'
})
export class AdminOrderListComponent {

  orders$!: Observable<Order[]>

  constructor (
    private adminService: AdminService
  ) {}
  
  ngOnInit(): void {
    this.orders$ = this.adminService.getOrders().pipe(
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
