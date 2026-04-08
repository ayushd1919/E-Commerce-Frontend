import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit{

  order$!: Observable<Order[]>

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.order$ = this.orderService.getOrders().pipe(
      map((res) => res.orders)
    )
  }
}
