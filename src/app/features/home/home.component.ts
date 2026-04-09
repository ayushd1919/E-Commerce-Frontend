import { Component } from '@angular/core';
import { HeroSliderComponent } from "../../shared/hero-slider/hero-slider.component";
import { DealSliderComponent } from "../../shared/deal-slider/deal-slider.component";
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { map, Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeroSliderComponent, DealSliderComponent, ProductCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  product$!: Observable<Product[]>
    
  constructor(
    private productService: ProductService,
  ) {
    this.product$ = this.productService.getProducts().pipe(
      map(res => res.products))
  }
}
