import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, numberAttribute } from '@angular/core';
import { TypeRes } from '../models/type.model';
import { CategoryRes } from '../models/category.model';
import { SubCategoryRes } from '../models/subCategory.model';

@Injectable({
  providedIn: 'root'
})
export class TaxanomyService {

  private apiUrl = 'http://localhost:3000/api/taxanomy'
  constructor(private http: HttpClient) { }

  getType() {
    return this.http.get<TypeRes>(this.apiUrl + '/type')
  }
  getCategory(id?: number) {
    let params = new HttpParams()
    if (id) {
      params = params.set('typeId', id)
    }
    return this.http.get<CategoryRes>(this.apiUrl + '/category', { params })
  }
  getSubCategory(id?: number) {
    let params = new HttpParams()
    if (id) {
      params = params.set('categoryId', id)
    }
    return this.http.get<SubCategoryRes>(this.apiUrl + '/subCategory', { params })
  }
  createType(name: string) {
    return this.http.post<TypeRes>(this.apiUrl + '/type/create', { name })
  }
  updateType(name: string, id: number) {
    return this.http.patch<TypeRes>(this.apiUrl + `/type/${id}`, { name })
  }
  creteCategory(name: string, typeId: number) {
    return this.http.post<CategoryRes>(this.apiUrl + '/category/create', { name, typeId })
  }
  updateCategory(name: string, typeId: number, id: number) {
    return this.http.patch<CategoryRes>(this.apiUrl + `/category/${id}`, { name, typeId })
  }
  creteSubCategory(name: string, categoryId: number) {
    return this.http.post<SubCategoryRes>(this.apiUrl + '/subCategory/create', { name, categoryId })
  }
  updateSubCategory(name: string, typeId: number, id: number) {
    return this.http.patch<SubCategoryRes>(this.apiUrl + `/subCategory/${id}`, { name, typeId })
  }
}
