import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OTPRes } from '../models/otp.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  private apiUrl = 'http://localhost:3000/api/reset'
  constructor(private http: HttpClient) { }

  getOtp(email: string) {
    return this.http.post<OTPRes>(this.apiUrl + '/otp', { email })
  }
  verifyOTP(email: string, otp: string) {
    return this.http.post<{message: string}>(this.apiUrl + '/verifyOTP', {email, otp})
  }
}
