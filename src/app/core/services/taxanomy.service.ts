import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, numberAttribute } from '@angular/core';
import { createTypeRes, TypeRes } from '../models/type.model';
import { CategoryRes, CreateCategoryRes } from '../models/category.model';
import { CreateSubCategoryRes, SubCategoryRes } from '../models/subCategory.model';

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

  //Admin Services
  createType(name: string) {
    return this.http.post<createTypeRes>(this.apiUrl + '/type/create', { name })
  }
  updateType(name: string, id: number) {
    return this.http.patch<createTypeRes>(this.apiUrl + `/type/${id}`, { name })
  }
  creteCategory(name: string, typeId: number) {
    return this.http.post<CreateCategoryRes>(this.apiUrl + '/category/create', { name, typeId })
  }
  updateCategory(name: string, typeId: number, id: number) {
    return this.http.patch<CreateCategoryRes>(this.apiUrl + `/category/${id}`, { name, typeId })
  }
  creteSubCategory(name: string, categoryId: number) {
    return this.http.post<CreateSubCategoryRes>(this.apiUrl + '/subCategory/create', { name, categoryId })
  }
  updateSubCategory(name: string, categoryId: number, id: number) {
    return this.http.patch<CreateSubCategoryRes>(this.apiUrl + `/subCategory/${id}`, { name, categoryId })
  }
}
