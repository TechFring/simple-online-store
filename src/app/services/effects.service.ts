import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EffectsService {
  public sidenavIsHidden: boolean;
  private _innerWidth: number;

  constructor() {
    this.sidenavIsHidden = false;
    this._innerWidth = window.innerWidth;

    window.addEventListener('resize', (): void => {
      this._innerWidth = window.innerWidth;
    });
  }

  get innerWidth(): number {
    return this._innerWidth;
  }
}
