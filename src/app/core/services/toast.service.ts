import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastData {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new Subject<ToastData | null>();
  toastState$ = this.toastsSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toastsSubject.next({ message, type });

    setTimeout(() => {
      this.toastsSubject.next(null);
    }, 3000);
  }
  dismiss() {
    this.toastsSubject.next(null);
  }
}
