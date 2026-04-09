import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface DealItem {
  image: string;
  title: string;
  offer: string;
}

@Component({
  selector: 'app-deal-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deal-slider.component.html',
  styleUrls: ['./deal-slider.component.css']
})
export class DealSliderComponent implements AfterViewInit {
  deals: DealItem[] = [
    { image: 'assets/deals/sunglasses.jpg', title: 'Trendy Sunglasses', offer: 'UNDER ₹299' },
    { image: 'assets/deals/salwar.jpg', title: 'Salwar Suits', offer: 'MIN. 60% OFF' },
    { image: 'assets/deals/bottomwear.jpg', title: "Women's Bottomwear", offer: 'MIN. 70% OFF' },
    { image: 'assets/deals/shirts.jpg', title: "Men's Shirts", offer: 'MIN. 70% OFF' },
    { image: 'assets/deals/footwear.jpg', title: "Men's Footwear", offer: 'MIN. 50% OFF' },
    { image: 'assets/deals/girls.jpg', title: "Girls' Clothing", offer: 'MIN. 60% OFF' },
    { image: 'assets/deals/bags.jpg', title: "Women's Bags", offer: 'UNDER ₹499' },
    { image: 'assets/deals/watch.jpg', title: "Men's Watches", offer: 'UP TO 70% OFF' }
  ];

  currentIndex = 0;
  maxIndex = 0;
  step = 0;

  @ViewChild('viewport') viewport!: ElementRef<HTMLElement>;
  @ViewChildren('dealCard') dealCards!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    queueMicrotask(() => this.measureSlider());

    this.dealCards.changes.subscribe(() => {
      queueMicrotask(() => this.measureSlider());
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.measureSlider();
  }

  prev(): void {
    this.currentIndex = Math.max(0, this.currentIndex - 1);
  }

  next(): void {
    this.currentIndex = Math.min(this.maxIndex, this.currentIndex + 1);
  }

  getTrackTransform(): string {
    return `translateX(-${this.currentIndex * this.step}px)`;
  }

  private measureSlider(): void {
    const cards = this.dealCards.toArray();
    if (!cards.length || !this.viewport) return;

    if (cards.length > 1) {
      const first = cards[0].nativeElement.getBoundingClientRect();
      const second = cards[1].nativeElement.getBoundingClientRect();
      this.step = Math.round(second.left - first.left);
    } else {
      this.step = cards[0].nativeElement.offsetWidth;
    }

    const viewportWidth = this.viewport.nativeElement.clientWidth;
    const visibleCount =
      this.step > 0 ? Math.max(1, Math.floor(viewportWidth / this.step)) : 1;

    this.maxIndex = Math.max(0, this.deals.length - visibleCount);
    this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
  }
}