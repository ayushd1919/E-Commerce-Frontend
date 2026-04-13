import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { AdminService } from '../../../core/services/admin.service';
import { ToastService } from '../../../core/services/toast.service';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-admin-customer-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-customer-list.component.html',
  styleUrl: '../../admin.component.css',
})
export class AdminCustomerListComponent implements OnInit {
  customers$ = new Observable<User[] | undefined>();

  constructor(
    private adminService: AdminService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.customers$ = this.adminService
      .getCustomers()
      .pipe(map((res) => res.customers));
  }

  toggleLock(id: number) {
    this.adminService.lockCustomer(id).subscribe({
      next: (res) => {
        this.toastService.show(res.message, 'success');
        setTimeout(() => {
          this.customers$ = this.adminService
            .getCustomers()
            .pipe(map((res) => res.customers));
        }, 10);
      },
    });
  }
}
