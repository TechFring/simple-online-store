import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { EffectsService } from 'src/app/services/effects.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef<HTMLDivElement>;

  constructor(public effectsService: EffectsService) {}

  ngOnInit(): void {}

  onClick(): void {
    this.sidenav.nativeElement.classList.toggle('sidenav-hidden');
    this.effectsService.sidenavIsHidden = !this.effectsService.sidenavIsHidden;
  }
}
