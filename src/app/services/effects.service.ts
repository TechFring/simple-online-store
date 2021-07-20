import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EffectsService {
  private readonly BREAKPOINT_SIDENAV = 820;
  private readonly BREAKPOINT_MOBILE = 650;

  private _innerWidth: number;

  private _isDarkMode: BehaviorSubject<boolean>;
  private _isMobile: BehaviorSubject<boolean>;
  private _sidenavIsHidden: BehaviorSubject<boolean>;
  public executeCartAnimation: BehaviorSubject<boolean>;

  constructor() {
    this._isDarkMode = new BehaviorSubject<boolean>(false);
    this._isMobile = new BehaviorSubject<boolean>(false);
    this._sidenavIsHidden = new BehaviorSubject<boolean>(false);
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

  get sidenavIsHidden(): BehaviorSubject<boolean> {
    return this._sidenavIsHidden;
  }

  handleDarkMode(isDarkMode: boolean): void {
    const value = !isDarkMode;
    this._isDarkMode.next(value);
    window.localStorage.setItem('@sos/dark-mode', String(value));
  }

  handleSidenav(sidenavIsHidden: boolean): void {
    this._sidenavIsHidden.next(!sidenavIsHidden);
  }
  
  private handleResize(): void {
    const innerWidth = window.innerWidth;
    const sidenavIsHidden = innerWidth <= this.BREAKPOINT_SIDENAV;
    const isMobile = innerWidth <= this.BREAKPOINT_MOBILE;

    this._innerWidth = innerWidth;
    this._isMobile.next(isMobile);
    this._sidenavIsHidden.next(sidenavIsHidden);
  }
}
