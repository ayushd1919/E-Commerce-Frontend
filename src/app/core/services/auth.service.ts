import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authRes, User } from '../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth'

  constructor(private http: HttpClient) { }

  register(user: Partial<User>) {
    return this.http.post<authRes>(this.apiUrl + "/register", user)
  }
  login(user: Partial<User>) {
    return this.http.post<authRes>(this.apiUrl + "/login", user)
  }
}
