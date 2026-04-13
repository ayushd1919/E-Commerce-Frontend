import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

interface SlideItem {
  badge: string;
  title: string;
  subtitle: string;
  offer: string;
  buttonText: string;
  image: string;
  leftBg: string;
  rightBg: string;
}

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css']
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  slides: SlideItem[] = [
    {
      badge: 'HER STYLE',
      title: 'Sale',
      subtitle: 'Breezy Summer Fits',
      offer: 'MIN. 60% OFF',
      buttonText: 'SHOP NOW',
      image: 'assets/slider/slide-1.png',
      leftBg: 'linear-gradient(180deg, #f4a6cf 0%, #f97d30 100%)',
      rightBg: 'linear-gradient(180deg, #f7d7e5 0%, #f1b95b 100%)'
    },
    {
      badge: 'TREND PICK',
      title: 'Festive',
      subtitle: 'New Season Ethnic Wear',
      offer: 'UP TO 50% OFF',
      buttonText: 'EXPLORE',
      image: 'assets/slider/slide-2.png',
      leftBg: 'linear-gradient(180deg, #f5b2c9 0%, #f27749 100%)',
      rightBg: 'linear-gradient(180deg, #f8d9e6 0%, #f0b86b 100%)'
    },
    {
      badge: 'HOT DEAL',
      title: 'Style',
      subtitle: 'Everyday Fashion Refresh',
      offer: 'STARTING ₹499',
      buttonText: 'BUY NOW',
      image: 'assets/slider/slide-3.png',
      leftBg: 'linear-gradient(180deg, #ef9dc8 0%, #ef6b38 100%)',
      rightBg: 'linear-gradient(180deg, #f6d4e1 0%, #efb04f 100%)'
    }
  ];

  currentIndex = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  startAutoSlide(): void {
    this.stopAutoSlide();
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}