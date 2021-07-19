import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EffectsService {
  public sidenavIsHidden: boolean;
  private _innerWidth: number;
  private _isMobile: boolean;
  private _isDarkMode = new BehaviorSubject<boolean>(false);

  constructor() {
    this.sidenavIsHidden = false;
    this.handleResize();

    const isDarkMode = window.localStorage.getItem('@sos/dark-mode');
    this._isDarkMode.next(isDarkMode === 'true');
    
    window.addEventListener('resize', (): void => {
      this.handleResize();
    });
  }
  
  get innerWidth(): number {
    return this._innerWidth;
  }

  get isMobile(): boolean {
    return this._isMobile;
  }

  get isDarkMode(): BehaviorSubject<boolean> {
    return this._isDarkMode;
  }

  handleDarkMode(isDarkMode: boolean): void {
    this._isDarkMode.next(!isDarkMode);
    window.localStorage.setItem('@sos/dark-mode', String(!isDarkMode));
  }
  
  private handleResize(): void {
    this._innerWidth = window.innerWidth;
    this._isMobile = this._innerWidth <= 650;
    this.sidenavIsHidden = this._innerWidth <= 820;
  }
}
