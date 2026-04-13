import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order, OrderStatus } from '../../core/models/order.model';
import { OrderService } from '../../core/services/order.service';
import { AdminService } from '../../core/services/admin.service';
import { AdminStats } from '../../core/models/admin.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: '../admin.component.css',
})
export class DashboardComponent implements OnInit {
  orders$!: Observable<Order[]>;
  stats: AdminStats | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.orders$ = this.adminService.getOrders().pipe(map((res) => res.orders));
    this.adminService.getStats().subscribe({
      next: (res) => {
        this.stats = res.stats;
      },
    });
  }
  statusClass(status: OrderStatus): string {
    const map: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 's-pending',
      [OrderStatus.CONFIRMED]: 's-confirmed',
      [OrderStatus.CANCELLED]: 's-cancelled',
    };
    return map[status] ?? 's-pending';
  }
}
