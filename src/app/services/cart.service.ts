import { Injectable } from '@angular/core';

import { Product, ProductCart } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: ProductCart[];
  private _totalAmount: number;
  private _executeAnimation: boolean;
  private _timeout: ReturnType<typeof setTimeout>;

  constructor() {
    this._cart = [];
    this._totalAmount = 0;
    this._executeAnimation = false;
  }

  get cart(): ProductCart[] {
    return this._cart;
  }

  get totalAmount(): number {
    return this._totalAmount;
  }

  get executeAnimation(): boolean {
    return this._executeAnimation;
  }

  addToCart(product: Product): void {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    let index: number | undefined;
    let productCart: ProductCart = { ...product, quantity: 1 };

    this._cart.forEach((p, i): void => {
      if (p.id === product.id) {
        const quantity = p.quantity + 1;
        productCart = { ...p, quantity };
        index = i;
        return;
      }
    });

    if (index !== undefined) this._cart[index] = productCart;
    else this._cart.push(productCart);

    this.calculateTotalAmount(product.price);
    this.handleAnimation();
  }

  private calculateTotalAmount(price: number): void {
    this._totalAmount += price;
  }

  private handleAnimation(): void {
    this._executeAnimation = true;
    this._timeout = setTimeout(() => {
      this._executeAnimation = false;
    }, 500);
  }
}
