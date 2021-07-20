import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { EffectsService } from 'src/app/services/effects.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, AfterViewInit {
  public sidenavIsShowing: boolean;

  @ViewChild('aside') aside: ElementRef;

  constructor(public effectsService: EffectsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.observeSidenavIsShowing();
  }

  /* OBSERVABLES */
  private observeSidenavIsShowing(): void {
    this.effectsService.sidenavIsShowing.subscribe((isShowing) => {
      this.sidenavIsShowing = isShowing;

      const elAside = this.aside.nativeElement;

      if (isShowing) {
        elAside.classList.remove('sidenav-hide');
      } else {
        elAside.classList.add('sidenav-hide');
      }
    });
  }
}
