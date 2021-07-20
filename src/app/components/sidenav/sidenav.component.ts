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
  public sidenavIsHidden: boolean;

  @ViewChild('aside') aside: ElementRef;

  constructor(public effectsService: EffectsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.observeSidenavIsHidden();
  }

  /* OBSERVABLES */
  private observeSidenavIsHidden(): void {
    this.effectsService.sidenavIsHidden.subscribe((isHidden) => {
      this.sidenavIsHidden = isHidden;

      const elAside = this.aside.nativeElement;

      if (isHidden) {
        elAside.classList.add('sidenav-hide');
      } else {
        elAside.classList.remove('sidenav-hide');
      }
    });
  }
}
