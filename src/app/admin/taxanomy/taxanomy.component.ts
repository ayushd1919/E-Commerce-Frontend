import { Component, OnInit } from '@angular/core';
import { Type } from '../../core/models/type.model';
import { Category } from '../../core/models/category.model';
import { SubCategory } from '../../core/models/subCategory.model';
import { TaxanomyService } from '../../core/services/taxanomy.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';

type TaxFormMode = 'type' | 'category' | 'subCategory';

@Component({
  selector: 'app-taxonomy',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './taxanomy.component.html',
  styleUrl: '../admin.component.css',
})
export class TaxanomyComponent implements OnInit {
  types$!: Observable<Type[]>;
  categories$!: Observable<Category[]>;
  subCategories$!: Observable<SubCategory[]>;

  showTaxForm = false;
  taxFormTitle = '';
  taxFormMode: TaxFormMode = 'type';

  taxFormName = '';
  taxFormParentId: number | null = null;
  taxEditingId: number | null = null;

  constructor(private taxonomyService: TaxanomyService) {}

  ngOnInit(): void {
    this.types$ = this.taxonomyService.getType().pipe(map((res) => res.types));
    this.categories$ = this.taxonomyService
      .getCategory()
      .pipe(map((res) => res.categories));
    this.subCategories$ = this.taxonomyService
      .getSubCategory()
      .pipe(map((res) => res.subCategories));
  }

  loadTypes(): void {
    this.types$ = this.taxonomyService.getType().pipe(map((res) => res.types));
  }

  loadCategories(typeId?: number): void {
    this.categories$ = this.taxonomyService
      .getCategory(typeId)
      .pipe(map((res) => res.categories));
  }

  loadSubCategories(categoryId?: number): void {
    this.subCategories$ = this.taxonomyService
      .getSubCategory(categoryId)
      .pipe(map((res) => res.subCategories));
  }

  openTypeForm(type?: Type): void {
    this.showTaxForm = true;
    this.taxFormMode = 'type';
    this.taxFormTitle = type ? 'Update Type' : 'Create Type';
    this.taxFormName = type ? type.name : '';
    this.taxEditingId = type ? type.id : null;
    this.taxFormParentId = null;
  }

  openCategoryForm(category?: Category): void {
    this.showTaxForm = true;
    this.taxFormMode = 'category';
    this.taxFormTitle = category ? 'Update Category' : 'Create Category';
    this.taxFormName = category ? category.name : '';
    this.taxEditingId = category ? category.id : null;
    this.taxFormParentId = category?.type?.id ?? null;
  }

  openSubCategoryForm(subCategory?: SubCategory): void {
    this.showTaxForm = true;
    this.taxFormMode = 'subCategory';
    this.taxFormTitle = subCategory
      ? 'Update Sub-Category'
      : 'Create Sub-Category';
    this.taxFormName = subCategory ? subCategory.name : '';
    this.taxEditingId = subCategory ? subCategory.id : null;
    this.taxFormParentId = subCategory?.category?.id ?? null;
  }

  closeTaxForm(): void {
    this.showTaxForm = false;
    this.taxFormTitle = '';
    this.taxFormMode = 'type';
    this.taxFormName = '';
    this.taxFormParentId = null;
    this.taxEditingId = null;
  }

  saveTaxItem(): void {
    const name = this.taxFormName.trim();
    if (!name) return;

    if (this.taxFormMode === 'type') {
      if (this.taxEditingId) {
        this.taxonomyService.updateType(name, this.taxEditingId).subscribe({
          next: () => {
            this.loadTypes();
            this.closeTaxForm();
          },
          error: (err) => console.error('Error updating type:', err),
        });
      } else {
        this.taxonomyService.createType(name).subscribe({
          next: () => {
            this.loadTypes();
            this.closeTaxForm();
          },
          error: (err) => console.error('Error creating type:', err),
        });
      }
      return;
    }

    if (this.taxFormMode === 'category') {
      if (!this.taxFormParentId) return;
      if (this.taxEditingId) {
        this.taxonomyService
          .updateCategory(name, this.taxFormParentId, this.taxEditingId)
          .subscribe({
            next: () => {
              this.loadCategories();
              this.closeTaxForm();
            },
            error: (err) => console.error('Error updating category:', err),
          });
      } else {
        this.taxonomyService
          .creteCategory(name, this.taxFormParentId)
          .subscribe({
            next: () => {
              this.loadCategories();
              this.closeTaxForm();
            },
            error: (err) => console.error('Error creating category:', err),
          });
      }
      return;
    }

    if (this.taxFormMode === 'subCategory') {
      if (!this.taxFormParentId) return;
      if (this.taxEditingId) {
        this.taxonomyService
          .updateSubCategory(name, this.taxFormParentId, this.taxEditingId)
          .subscribe({
            next: () => {
              this.loadSubCategories();
              this.closeTaxForm();
            },
            error: (err) => console.error('Error updating sub-category:', err),
          });
      } else {
        this.taxonomyService
          .creteSubCategory(name, this.taxFormParentId)
          .subscribe({
            next: () => {
              this.loadSubCategories();
              this.closeTaxForm();
            },
            error: (err) => console.error('Error creating sub-category:', err),
          });
      }
    }
  }
}
