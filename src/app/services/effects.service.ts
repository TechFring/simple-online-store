import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EffectsService {
  private readonly BREAKPOINT_NAV = 820;
  private readonly BREAKPOINT_MOBILE = 650;

  private _innerWidth: number;

  private _isDarkMode: BehaviorSubject<boolean>;
  private _isMobile: BehaviorSubject<boolean>;
  private _sidenavIsShowing: BehaviorSubject<boolean>;
  private _cartShoppingIsShowing: BehaviorSubject<boolean>;
  private _navbarIsExpanded: BehaviorSubject<boolean>;
  public executeCartAnimation: BehaviorSubject<boolean>;

  constructor() {
    this._isDarkMode = new BehaviorSubject<boolean>(false);
    this._isMobile = new BehaviorSubject<boolean>(false);
    this._sidenavIsShowing = new BehaviorSubject<boolean>(false);
    this._cartShoppingIsShowing = new BehaviorSubject<boolean>(false);
    this._navbarIsExpanded = new BehaviorSubject<boolean>(false);
    this.executeCartAnimation = new BehaviorSubject<boolean>(false);

    const isDarkMode = window.localStorage.getItem('@sos/dark-mode');
    this._isDarkMode.next(isDarkMode === 'true');

    this.handleResize();

    window.addEventListener('resize', (): void => {
      this.handleResize();
    });
  }

  get innerWidth(): number {
    return this._innerWidth;
  }

  get isMobile(): BehaviorSubject<boolean> {
    return this._isMobile;
  }

  get isDarkMode(): BehaviorSubject<boolean> {
    return this._isDarkMode;
  }

  get sidenavIsShowing(): BehaviorSubject<boolean> {
    return this._sidenavIsShowing;
  }

  get cartShoppingIsShowing(): BehaviorSubject<boolean> {
    return this._cartShoppingIsShowing;
  }

  get navbarIsExpanded(): BehaviorSubject<boolean> {
    return this._navbarIsExpanded;
  }

  handleDarkMode(isDarkMode: boolean): void {
    const value = !isDarkMode;
    this._isDarkMode.next(value);
    window.localStorage.setItem('@sos/dark-mode', String(value));
  }

  handleSidenav(sidenavIsShowing: boolean): void {
    this._sidenavIsShowing.next(!sidenavIsShowing);
  }

  handleCartShopping(cartShoppingIsShowing: boolean): void {
    this._cartShoppingIsShowing.next(!cartShoppingIsShowing);
  }

  private handleResize(): void {
    const innerWidth = window.innerWidth;
    const navbarIsExpanded = innerWidth <= this.BREAKPOINT_NAV;
    const isMobile = innerWidth <= this.BREAKPOINT_MOBILE;

    this._innerWidth = innerWidth;
    this._navbarIsExpanded.next(navbarIsExpanded);
    this._isMobile.next(isMobile);
  }
}
