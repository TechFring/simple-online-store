import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { fadeInOut } from 'src/app/animations';

import { CartService } from 'src/app/services/cart.service';
import { EffectsService } from 'src/app/services/effects.service';

@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.scss'],
  animations: [fadeInOut]
})
export class CartShoppingComponent implements OnInit, AfterViewInit {
  public cartShoppingIsShowing: boolean;

  @ViewChild('aside') aside: ElementRef;

  constructor(
    public cartService: CartService,
    public effectsService: EffectsService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.observeCartShoppingIsShowing();
  }

  /* OBSERVABLES */
  private observeCartShoppingIsShowing(): void {
    this.effectsService.cartShoppingIsShowing.subscribe((isShowing) => {
      this.cartShoppingIsShowing = isShowing;

      const elAside = this.aside.nativeElement;

      if (isShowing) {
        elAside.classList.remove('sidenav-hide');
      } else {
        elAside.classList.add('sidenav-hide');
      }
    });
  }
}
