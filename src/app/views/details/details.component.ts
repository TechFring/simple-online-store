import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MocksService } from 'src/app/services/mocks.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public product: Product;
  public otherProducts: Product[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mocksService: MocksService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.observeUrlParams();
  }

  /* OBSERVABLES */
  private observeUrlParams(): void {
    this.route.params.subscribe((params) => {
      try {
        const id = parseInt(params.id);
        this.product = this.mocksService.searchProductById(id);
        this.otherProducts = this.mocksService.getOtherProducts(id);
      } catch (err) {
        this.router.navigate(['']);
      }
    });
  }
}
