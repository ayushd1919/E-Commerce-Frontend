import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authRes, SessionRes, User } from '../models/user.model';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth'

  userSubject = new BehaviorSubject<User | null>(null)

  user$ = this.userSubject.asObservable()

  constructor(private http: HttpClient) { }

  register(user: Partial<User>) {
    return this.http.post<authRes>(this.apiUrl + "/register", user)
  }
  login(user: Partial<User>) {
    return this.http.post<authRes>(this.apiUrl + "/login", user).pipe(
      tap((res) => {
        this.userSubject.next(res.user)
        console.log(res.user)
        console.log(this.userSubject.value)
      })
    )
  }
  logout() {
    return this.http.post<{ message: string }>(this.apiUrl + "/logout", {}).pipe(
      tap((res) => this.userSubject.next(null))
    )
  }
  loggedIn(): Observable<boolean> {
    return this.http.get<{ loggedIn: boolean }>(this.apiUrl + '/status').pipe(
      map(res => res.loggedIn)
    )
  }
  getRole() {
    return this.userSubject.value?.role
  }
  logoutById(sessionId: number) {
    return this.http.post<{message: string}>(this.apiUrl + `/logout/${sessionId}`,{})
  }
  logoutAll() {
    return this.http.post<{message: string}>(this.apiUrl + '/logoutAll',{})
  }
  getSessions() {
    return this.http.get<SessionRes>(this.apiUrl + '/sessions')
  }
}
