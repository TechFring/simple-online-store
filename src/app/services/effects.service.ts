import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EffectsService {
  public sidenavIsHidden: boolean;
  private _innerWidth: number;
  private _isMobile: boolean;

  constructor() {
    this.sidenavIsHidden = false;
    this.handleResize();
    
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
  
  private handleResize(): void {
    this._innerWidth = window.innerWidth;
    this._isMobile = this._innerWidth <= 650;
    this.sidenavIsHidden = this._innerWidth <= 820;
  }
}
