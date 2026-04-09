import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.styles.css']
})
export class LoginComponent {

  loginForm!: FormGroup

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.toastService.show(res.message, 'success')
        setTimeout(() => {
          this.router.navigate(['/'])
        },10)
      }
    })
  }
  logout() {
    this.authService.logout().subscribe({
      next: (res) => this.toastService.show(res.message, 'success')
    })
  }
}
