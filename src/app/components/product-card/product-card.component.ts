import { Component, Input, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { EffectsService } from 'src/app/services/effects.service';
import { MocksService } from 'src/app/services/mocks.service';
import { Product } from 'src/app/models/product';
import { fadeInOut } from 'src/app/animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [fadeInOut],
})
export class ProductCardComponent implements OnInit {
  public isMobile: boolean;

  @Input() product: Product;

  constructor(
    public cartService: CartService,
    public effectsService: EffectsService,
    public mocksService: MocksService
  ) {}

  ngOnInit(): void {
    this.observeIsMobile();
  }

  /* OBSERVABLES */
  private observeIsMobile(): void {
    this.effectsService.isMobile.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
