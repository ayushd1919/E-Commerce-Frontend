import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
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

  type$!: Observable<Type[]>
  category$!: Observable<Category[]>
  subCategory$!: Observable<SubCategory[]>

  typeControl = new FormControl('')
  categoryControl = new FormControl('')
  subCategoryControl = new FormControl('')

  constructor(private taxanomyService: TaxanomyService, private router: Router) {
    this.type$ = this.taxanomyService.getType().pipe(map(res => res.type))
  }

  ngOnInit(): void {
    this.typeControl.valueChanges.subscribe({
      next: (res) => {
        if (!res)
          return
        this.category$ = this.taxanomyService.getCategory(Number(res)).pipe(
          map(res => res.category)
        )
        this.router.navigate([], {
          queryParams: {
            typeId: res
          },
          queryParamsHandling: 'merge'
        })
      }
    })

    this.categoryControl.valueChanges.subscribe({
      next: (res) => {
        if (!res)
          return
        this.subCategory$ = this.taxanomyService.getSubCategory(Number(res)).pipe(
          map(res => res.subCategory)
        )
        this.router.navigate([], {
          queryParams: {
            categoryId: res
          },
          queryParamsHandling: 'merge'
        })
      }
    })

    this.subCategoryControl.valueChanges.subscribe({
      next: (res) => {
        this.router.navigate([], {
          queryParams: {
            subCategoryId: res
          },
          queryParamsHandling: 'merge'
        })
      }
    })
  }
}
