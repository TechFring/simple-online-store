import { Injectable } from '@angular/core';

import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class MocksService {
  private readonly originalProducts: Product[] = [];
  private _products: Product[] = [];

  constructor() {
    const total = 8;
    this.generateProducts(total);
  }

  get products(): Product[] {
    return this._products;
  }

  searchProductsByName(search: string): void {
    search = search.trim().toLowerCase();

    const filtered = this.originalProducts.filter((p): Product | void => {
      if (p.name.toLowerCase().includes(search)) return p;
    });

    this._products = filtered;
  }

  searchProductById(id: number): Product {
    const filtered = this.originalProducts.filter(
      (product) => product.id === id
    )[0];

    if (filtered === undefined) {
      throw new Error('No product found');
    }

    return filtered;
  }

  private generateProducts(total: number): void {
    for (let i = 1; i <= total; i++) {
      const product: Product = {
        id: i,
        name: `Product ${i}`,
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        price: this.getRandomPrice(),
        image: 'https://source.unsplash.com/random/230x377',
      };

      this.originalProducts.push(product);
    }

    this._products = this.originalProducts;
  }

  private getRandomPrice(): number {
    const min = 10;
    const max = 60;

    return Math.random() * (max - min) + min;
  }
}
