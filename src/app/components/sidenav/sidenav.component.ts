import { Component, OnInit } from '@angular/core';

import { EffectsService } from 'src/app/services/effects.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(public effectsService: EffectsService) {}

  ngOnInit(): void {}

  onClick(): void {
    this.effectsService.sidenavIsHidden = !this.effectsService.sidenavIsHidden;
  }
}
