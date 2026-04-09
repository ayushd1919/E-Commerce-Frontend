import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderForm, orderRes, ordersRes, PaymentMethod } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/api/order'

  constructor(private http: HttpClient) { }

  placeOrder(orderForm: orderForm) {
    return this.http.post<orderRes>(this.apiUrl + '/place',{...orderForm})
  }
  confirmOrder(id: number, addressId: number, paymentMethod: PaymentMethod) {
    return this.http.post<orderRes>(this.apiUrl + `/confirm/${id}`, {paymentMethod, addressId})
  }
  cancelOrder(id: number) {
    return this.http.delete<orderRes>(this.apiUrl + `/cancel/${id}`)
  }
  getOrders() {
    return this.http.get<ordersRes>(this.apiUrl + '/all')
  }
  getOrdersById(id: number) {
    return this.http.get<orderRes>(this.apiUrl + `/${id}`)
  }
  getLatest() {
    return this.http.get<orderRes>(this.apiUrl + '/latest')
  }
}
