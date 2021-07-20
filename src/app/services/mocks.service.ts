import { Injectable } from '@angular/core';

import { Product } from 'src/app/models/product';
@Injectable({
  providedIn: 'root',
})
export class MocksService {
  private readonly _originalProducts: Product[] = [];
  private _products: Product[] = [];

  constructor() {
    const total = 15;
    this.generateProducts(total);
  }

  get products(): Product[] {
    return this._products;
  }

  searchProductsByName(search: string): void {
    search = search.trim().toLowerCase();

    const filtered = this._originalProducts.filter((p): Product | void => {
      if (p.name.toLowerCase().includes(search)) return p;
    });

    this._products = filtered;
  }

  searchProductById(id: number): Product {
    const filtered = this._originalProducts.filter((p) => p.id === id)[0];

    if (filtered === undefined) {
      throw new Error('No product found');
    }

    return filtered;
  }

  getOtherProducts(id: number): Product[] {
    const products = this._originalProducts.filter((p) => p.id !== id);
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

      this._originalProducts.push(product);
    }

    this._products = this._originalProducts;
  }

  private getRandomPrice(): number {
    const min = 10;
    const max = 60;

    return Math.random() * (max - min) + min;
  }
}
