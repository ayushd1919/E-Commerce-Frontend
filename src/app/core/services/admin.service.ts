import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminStats, customerRes, customersRes } from '../models/admin.model';
import { BehaviorSubject, tap } from 'rxjs';
import { orderRes, ordersRes } from '../models/order.model';
import { createTypeRes } from '../models/type.model';
import { Product, productRes } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000/api/admin/'

  private customerSubject = new BehaviorSubject<customersRes | null>(null)
  customer$ = this.customerSubject.asObservable()

  constructor(private http: HttpClient) { }

  //Customer Management
  getCustomers() {
    return this.http.get<customersRes>(this.apiUrl + 'customer/all')
      .pipe(tap(res => this.customerSubject.next(res)))
  }
  getCustomerById(id: number) {
    return this.http.get<customerRes>(this.apiUrl + `customer/${id}`)
  }
  lockCustomer(id: number){
    return this.http.patch<{message: string}>(this.apiUrl + `customer/${id}`,{})
  }

  //Order Management
  getOrders() {
    return this.http.get<ordersRes>(this.apiUrl + 'order/all')
  }
  getOrderById(id: number) {
    return this.http.get<orderRes>(this.apiUrl + `order/${id}`)
  }

  //Product Management
  createProduct(formData: FormData) {
    return this.http.post<productRes>(this.apiUrl + 'product/create', formData)
  }
  updateProduct(id: number, formData: FormData) {
    return this.http.patch<productRes>(this.apiUrl + `product/${id}`, formData)
  }
  
  getStats() {
  return this.http.get<{ stats: AdminStats }>(this.apiUrl + 'stats')
}
}
