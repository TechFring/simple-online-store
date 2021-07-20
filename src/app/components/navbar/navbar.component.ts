import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { EffectsService } from 'src/app/services/effects.service';
import { MocksService } from 'src/app/services/mocks.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  public inputSearch: string;
  public isDarkMode: boolean;
  public executeCartAnimation: boolean;

  @ViewChild('iconDarkMode') iconDarkMode: ElementRef;
  @ViewChild('iconCart') iconCart: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  constructor(
    public cartService: CartService,
    public effectsService: EffectsService,
    public mocksService: MocksService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.observeIsDarkMode();
    this.observeExecuteCartAnimation();
    this.observeSidenavIsHidden();
  }

  /* EVENTS */
  onChange(): void {
    this.mocksService.searchProductsByName(this.inputSearch);
  }

  /* OBSERVABLES */
  private observeIsDarkMode(): void {
    this.effectsService.isDarkMode.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;

      const className = isDarkMode ? 'far fa-lightbulb' : 'fas fa-lightbulb';
      const elDarkMode = this.iconDarkMode.nativeElement;
      elDarkMode.className = className;
    });
  }

  private observeExecuteCartAnimation(): void {
    this.effectsService.executeCartAnimation.subscribe((animation) => {
      this.executeCartAnimation = animation;
      const elIconCart = this.iconCart.nativeElement;

      if (animation) {
        elIconCart.classList.add('cart-animation');
      } else {
        elIconCart.classList.remove('cart-animation');
      }
    });
  }

  private observeSidenavIsHidden(): void {
    this.effectsService.sidenavIsHidden.subscribe((isHidden) => {
      const elMenu = this.menu.nativeElement;
      const className = isHidden ? 'dropdown' : 'expanded-navigation';
      elMenu.className = className;
    });
  }
}
