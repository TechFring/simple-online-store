import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EffectsService {
  public sidenavIsHidden: boolean;
  private _innerWidth: number;

  constructor() {
    this.sidenavIsHidden = false;
    this.handleSidenav();
    
    window.addEventListener('resize', (): void => {
      this.handleSidenav();
    });
  }
  
  get innerWidth(): number {
    return this._innerWidth;
  }
  
  private handleSidenav(): void {
    this._innerWidth = window.innerWidth;
    this.sidenavIsHidden = this._innerWidth <= 820;
  }
}
