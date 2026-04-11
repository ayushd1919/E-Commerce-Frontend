import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartRes } from '../models/cart.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new BehaviorSubject<CartRes | null>(null)
  cart$ = this.cartSubject.asObservable()

  private apiUrl = 'http://localhost:3000/api/cart'
  constructor(private http: HttpClient) { }

  getCart() {
    return this.http.get<CartRes>(this.apiUrl + '/view').pipe(
      tap(res => this.cartSubject.next(res))
    );
  }
  addProduct(productId: number, quantity: number) {
    return this.http.post<CartRes>(this.apiUrl + `/add/${productId}`, { quantity })
      .pipe(tap(res => this.cartSubject.next(res)))
  }
  removeProduct(cartItemId: number) {
    return this.http.delete<{ message: string }>(this.apiUrl + `/remove/${cartItemId}`)
      .pipe(tap(() => this.getCart().subscribe()))
  }
}
