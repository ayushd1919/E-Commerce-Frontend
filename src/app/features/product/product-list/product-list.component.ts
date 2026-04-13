import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Product, ProductListRes } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { ProductCardComponent } from '../../../shared/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterPanelComponent } from '../../../shared/filter-panel/filter-panel.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule, FilterPanelComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {

  products: Product[]  = [];
  totalPages           = 1;
  currentPage          = 1;
  pageNumbers: number[] = [];
  isLoading            = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isLoading = true;
      this.productService.getProducts(
        params['typeId'],
        params['categoryId'],
        params['subCategoryId'],
        params['maxPrice'],
        params['minPrice'],
        params['search'],
        params['page'],
      ).subscribe({
        next: (res) => {
          this.products    = res.products;
          this.totalPages  = res.pagination.totalPages;
          this.currentPage = res.pagination.page;
          this.pageNumbers = this.buildPageNumbers(this.currentPage, this.totalPages);
          this.isLoading   = false;
        },
        error: () => { this.isLoading = false; }
      });
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  buildPageNumbers(current: number, total: number): number[] {
    const delta = 2;
    const start = Math.max(1, current - delta);
    const end   = Math.min(total, current + delta);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}