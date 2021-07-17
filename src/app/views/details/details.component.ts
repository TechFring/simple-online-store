import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MocksService } from 'src/app/services/mocks.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mocksService: MocksService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      try {
        const id = parseInt(params.id);
        this.product = this.mocksService.searchProductById(id);
      } catch (err) {
        this.router.navigate(['']);
      }
    });
  }
}
