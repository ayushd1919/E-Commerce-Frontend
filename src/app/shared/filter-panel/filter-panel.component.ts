import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Type } from '../../core/models/type.model';
import { TaxanomyService } from '../../core/services/taxanomy.service';
import { Category } from '../../core/models/category.model';
import { SubCategory } from '../../core/models/subCategory.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-panel',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css'
})
export class FilterPanelComponent implements OnInit {

  type$!: Observable<Type[]>;
  category$!: Observable<Category[]>;
  subCategory$!: Observable<SubCategory[]>;

  typeControl        = new FormControl('');
  categoryControl    = new FormControl('');
  subCategoryControl = new FormControl('');
  minPriceControl    = new FormControl('');
  maxPriceControl    = new FormControl('');

  constructor(private taxanomyService: TaxanomyService, private router: Router) {
    this.type$ = this.taxanomyService.getType().pipe(map(res => res.types));
  }

  ngOnInit(): void {
    this.typeControl.valueChanges.subscribe(res => {
      if (!res) return;
      this.category$ = this.taxanomyService.getCategory(Number(res)).pipe(map(r => r.categories));
      this.categoryControl.setValue('', { emitEvent: false });
      this.subCategoryControl.setValue('', { emitEvent: false });
      this.subCategory$ = undefined!;
      this.router.navigate([], {
        queryParams: { typeId: res, categoryId: null, subCategoryId: null, page: null },
        queryParamsHandling: 'merge'
      });
    });

    this.categoryControl.valueChanges.subscribe(res => {
      if (!res) return;
      this.subCategory$ = this.taxanomyService.getSubCategory(Number(res)).pipe(map(r => r.subCategories));
      this.subCategoryControl.setValue('', { emitEvent: false });
      this.router.navigate([], {
        queryParams: { categoryId: res, subCategoryId: null, page: null },
        queryParamsHandling: 'merge'
      });
    });

    this.subCategoryControl.valueChanges.subscribe(res => {
      this.router.navigate([], {
        queryParams: { subCategoryId: res, page: null },
        queryParamsHandling: 'merge'
      });
    });
  }

  applyPrice() {
    const min = this.minPriceControl.value;
    const max = this.maxPriceControl.value;
    this.router.navigate([], {
      queryParams: { minPrice: min || null, maxPrice: max || null, page: null },
      queryParamsHandling: 'merge'
    });
  }

  clearAll() {
    this.typeControl.setValue('', { emitEvent: false });
    this.categoryControl.setValue('', { emitEvent: false });
    this.subCategoryControl.setValue('', { emitEvent: false });
    this.minPriceControl.setValue('');
    this.maxPriceControl.setValue('');
    this.category$     = undefined!;
    this.subCategory$  = undefined!;
    this.router.navigate([], {
      queryParams: { typeId: null, categoryId: null, subCategoryId: null, minPrice: null, maxPrice: null, page: null },
      queryParamsHandling: 'merge'
    });
  }
}