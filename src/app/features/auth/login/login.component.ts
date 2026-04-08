import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.styles.css']
})
export class LoginComponent {

  loginForm!: FormGroup

  constructor(private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login() {
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }
  logout() {
    this.authService.logout().subscribe({
      next: (res) => console.log(res)
    })
  }
}
