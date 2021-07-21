import { Injectable } from '@angular/core';

import { Product } from 'src/app/models/product';
@Injectable({
  providedIn: 'root',
})
export class MocksService {
  private readonly _products: Product[] = [];

  constructor() {
    const total = 15;
    this.generateProducts(total);
  }

  get products(): Product[] {
    return this._products;
  }

  searchProductById(id: number): Product {
    const filtered = this._products.filter((p) => p.id === id)[0];

    if (filtered === undefined) {
      throw new Error('No product found');
    }

    return filtered;
  }

  getOtherProducts(id: number): Product[] {
    const products = this._products.filter((p) => p.id !== id);
    return products;
  }

  private generateProducts(total: number): void {
    for (let i = 1; i <= total; i++) {
      const product: Product = {
        id: i,
        name: `Product ${i}`,
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        price: this.getRandomPrice(),
        image: 'https://source.unsplash.com/random/500x800',
      };

      this._products.push(product);
    }
  }

  private getRandomPrice(): number {
    const min = 10;
    const max = 60;

    return Math.random() * (max - min) + min;
  }
}
