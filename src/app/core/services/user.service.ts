import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authRes, profileRes, User } from '../models/user.model';
import { Address, AddressRes } from '../models/address.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/auth'
  private addressSubject = new BehaviorSubject<AddressRes | null>(null)
  address$ = this.addressSubject.asObservable()
  constructor(private http: HttpClient) { }

  geProfile() {
    return this.http.get<profileRes>(this.apiUrl + '/profile')
  }
  updateProfile(updateData: Partial<User>) {
    return this.http.patch<authRes>(this.apiUrl + '/updateProfile', updateData)
  }
  getAddress() {
    return this.http.get<AddressRes>(this.apiUrl + '/address').pipe(
      tap(res => this.addressSubject.next(res))
    )
  }
  createAddress(address: Address) {
    return this.http.post<AddressRes>(this.apiUrl + '/address', address).pipe(
      tap(res => this.addressSubject.next(res))
    )
  }
  updateAddress(updateData: Partial<Address>, id: number) {
    return this.http.patch<AddressRes>(this.apiUrl + `/address/${id}`, updateData).pipe(
      tap(res => this.addressSubject.next(res))
    )
  }
  deleteAddress(id: number) {
    return this.http.delete<{ message: string }>(this.apiUrl + `/address/${id}`)
    .pipe(tap(() => this.getAddress().subscribe()))
  }
}
