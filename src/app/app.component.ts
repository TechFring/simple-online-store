import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { EffectsService } from './services/effects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  public title = 'simple-online-store';
  private sidenavIsShowing: boolean;
  private cartShoppingIsShowing: boolean;

  private lockX: number;
  private lockY: number;

  @ViewChild('content') content: ElementRef;

  constructor(private router: Router, public effectsService: EffectsService) {}

  ngOnInit(): void {
    this.updateScrollLocks();
    this.observeRoutes();
    this.observeDarkMode();
  }

  ngAfterViewInit(): void {
    this.observeSidenavIsShowing();
    this.observeCartShoppingIsShowing();
  }

  /* EVENTS */
  onClickBlur(): void {
    if (this.sidenavIsShowing) {
      this.effectsService.handleSidenav(true);
    }

    if (this.cartShoppingIsShowing) {
      this.effectsService.handleCartShopping(true);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll = (): void => {
    if (document.body.classList.contains('lock-scrollbar')) {
      window.scrollTo(this.lockX, this.lockY);
    } else {
      this.updateScrollLocks();
    }
  };

  /* OBSERVABLES */
  private observeRoutes(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.onClickBlur();
      }
    });
  }

  private observeDarkMode(): void {
    this.effectsService.isDarkMode.subscribe((isDarkMode) => {
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    });
  }

  private observeSidenavIsShowing(): void {
    this.effectsService.sidenavIsShowing.subscribe((isShowing) => {
      window.setTimeout(() => {
        this.sidenavIsShowing = isShowing;
        this.handleBodyNativeElement(isShowing);
      }, 50);
    });
  }

  private observeCartShoppingIsShowing(): void {
    this.effectsService.cartShoppingIsShowing.subscribe((isShowing) => {
      window.setTimeout(() => {
        this.cartShoppingIsShowing = isShowing;
        this.handleBodyNativeElement(isShowing);
      }, 50);
    });
  }

  /* SHARE */
  private handleBodyNativeElement(isShowing: boolean): void {
    const nativeElement = this.content.nativeElement;

    if (isShowing) {
      nativeElement.classList.add('blur');
      document.body.classList.add('lock-scrollbar');
    } else {
      nativeElement.classList.remove('blur');
      document.body.classList.remove('lock-scrollbar');
    }
  }

  private updateScrollLocks(): void {
    this.lockX = window.scrollX;
    this.lockY = window.scrollY;
  }
}
