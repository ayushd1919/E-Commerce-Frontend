import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PasswordResetService } from '../../../core/services/password-reset.service';
import { ToastService } from '../../../core/services/toast.service';
import { OTP } from '../../../core/models/otp.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css', '../auth.styles.css']
})
export class ForgetPasswordComponent {
  step: number = 1
  otp!: OTP
  email = new FormControl('', [Validators.required, Validators.email])
  otpField = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{4}$/)])

  constructor(private passwordResetService: PasswordResetService,
    private toastService: ToastService,
    private router: Router
  ) { }

  sendOtp() {
    if (this.email.value) {
      this.passwordResetService.getOtp(this.email.value).subscribe({
        next: (res) => {
          this.toastService.show(res.message + ', '+res.otp.code, 'success', 10000)
          this.step = 2
        }
      })
    }
  }
  verifyOTP() {
    if(this.otpField.value && this.email.value) {
      console.log(this.otpField.value)
      this.passwordResetService.verifyOTP(this.email.value, this.otpField.value).subscribe({
        next: (res) => {
          this.toastService.show(res.message)
          setTimeout(() => [
            this.router.navigate(['/account/change-password'])
          ],10)
        }
      })
    }
  }
}
