import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addProductCartRes, CartRes } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/api/cart'
  constructor(private http: HttpClient) { }

  getCart() {
    return this.http.get<CartRes>(this.apiUrl + '/view')
  }
  addProduct(id: number) {
    return this.http.post<addProductCartRes>(this.apiUrl + `add/${id}`,{})
  }
  removeProduct(id:number) {
    return this.http.delete<{message: string}>(this.apiUrl + `add${id}`)
  }
}
