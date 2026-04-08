import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderRes } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/api/order'

  constructor(private http: HttpClient) { }

  placeOrder() {
    return this.http.post<orderRes>(this.apiUrl + '/place',{})
  }
  confirmOrder(id: number) {
    return this.http.post<orderRes>(this.apiUrl + `/confirm/${id}`, {})
  }
  cancelOrder(id: number) {
    return this.http.delete<orderRes>(this.apiUrl + `/cancel/${id}`)
  }
  getOrders() {
    return this.http.get<orderRes>(this.apiUrl + '/all')
  }
  getOrdersById(id: number) {
    return this.http.get<orderRes>(this.apiUrl + `/${id}`)
  }
}
