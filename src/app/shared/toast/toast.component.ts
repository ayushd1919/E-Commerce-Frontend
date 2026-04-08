import { Component } from '@angular/core';
import { ToastData, ToastService } from '../../core/services/toast.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {

  toast$!: Observable<ToastData | null>

  constructor(private toastService: ToastService) {
    this.toast$ = this.toastService.toastState$
  }
  dismiss() {
    this.toastService.dismiss()
  }
}
