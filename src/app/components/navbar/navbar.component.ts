import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { EffectsService } from 'src/app/services/effects.service';
import { MocksService } from 'src/app/services/mocks.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public inputSearch: string;
  public isDarkMode: boolean;

  constructor(
    public cartService: CartService,
    public effectsService: EffectsService,
    public mocksService: MocksService
  ) {}

  ngOnInit(): void {
    this.effectsService.isDarkMode.subscribe((res) => {
      this.isDarkMode = res;
    });
  }

  onChange(): void {
    this.mocksService.searchProductsByName(this.inputSearch);
  }
}
