import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { MocksService } from 'src/app/services/mocks.service';
import { fadeInOut } from 'src/app/animations'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeInOut]
})
export class MainComponent implements OnInit {
  constructor(
    public cartService: CartService,
    public mocksService: MocksService
  ) {}

  ngOnInit(): void {}
}
