import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { EffectsService } from 'src/app/services/effects.service';
import { MocksService } from 'src/app/services/mocks.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  private originalProducts: Product[];
  public products: Product[];
  public inputSearch: string;

  constructor(
    public cartService: CartService,
    public effectsService: EffectsService,
    public mocksService: MocksService
  ) {}

  ngOnInit(): void {
    this.originalProducts = this.mocksService.products;
    this.products = this.mocksService.products;
  }

  /* EVENTS */
  onChangeSearch(): void {
    const search = this.inputSearch.trim().toLowerCase();

    const filtered = this.originalProducts.filter((p): Product | void => {
      if (p.name.toLowerCase().includes(search)) return p;
    });

    this.products = filtered;
  }
}
