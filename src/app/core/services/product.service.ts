import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productRes } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/product'

  constructor(private http: HttpClient) { }

  getProductById(id: number) {
    return this.http.get<productRes>(this.apiUrl + `/${id}`)
  }
  getProducts(typeId?: string, categoryId?: string, subCategoryId?: string) {
    return this.http.get<productRes>(this.apiUrl + '/filter')
  }  
}