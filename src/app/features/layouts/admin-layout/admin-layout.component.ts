import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { ToastComponent } from "../../../shared/toast/toast.component";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, ToastComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: '../../../admin/admin.component.css'
})
export class AdminLayoutComponent {

  constructor (
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}
  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.toastService.show(res.message, 'success')
        }, 10)
        this.router.navigate(['/home'])
      }
    })
  }
}
