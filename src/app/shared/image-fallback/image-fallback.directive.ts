import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImageFallback]'
})
export class ImageFallbackDirective {

  @Input() productType: string = ''

  private placeholderMap: Record<string, string> = {
    'electronics':          'assets/placeholders/electronics.png',
    'furniture':            'assets/placeholders/furniture.png',
    'stationery & books':   'assets/placeholders/stationery.png',
    'fashion':              'assets/placeholders/fashion.png',
    'kitchen & appliances': 'assets/placeholders/kitchen.png',
  }

  private fallback = 'assets/placeholders/default.png'
  private hasErrored = false  

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError() {
    if (this.hasErrored) return  
    this.hasErrored = true

    const key     = this.productType?.toLowerCase().trim()
    const matched = this.placeholderMap[key] ?? this.fallback
    this.el.nativeElement.src = matched
  }
}