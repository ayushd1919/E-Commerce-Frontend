import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductListRes, productRes } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/product';

  constructor(private http: HttpClient) {}

  getProductById(id: number) {
    return this.http.get<productRes>(this.apiUrl + `/${id}`);
  }
  getProducts(
    typeId?: string,
    categoryId?: string,
    subCategoryId?: string,
    maxPrice?: number,
    minPrice?: number,
    search?: string,
    page?: number,
  ) {
    let params = new HttpParams();

    if (typeId) params = params.set('typeId', typeId);
    if (categoryId) params = params.set('categoryId', categoryId);
    if (subCategoryId) params = params.set('subCategoryId', subCategoryId);
    if (maxPrice !== undefined) params = params.set('maxPrice', maxPrice);
    if (minPrice !== undefined) params = params.set('minPrice', minPrice);
    if (search) params = params.set('search', search);
    if (page) params = params.set('page', page);
    return this.http.get<ProductListRes>(this.apiUrl + '/filter', { params });
  }
}
