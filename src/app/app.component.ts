import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';

import { EffectsService } from './services/effects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  public title = 'simple-online-store';

  @ViewChild('main') main: ElementRef;

  constructor(public effectsService: EffectsService) {}

  ngOnInit(): void {
    this.observeDarkMode();
  }

  ngAfterViewInit(): void {
    this.observeSidenavIsHidden();
  }

  /* OBSERVABLES */
  private observeDarkMode(): void {
    this.effectsService.isDarkMode.subscribe((isDarkMode) => {
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    });
  }

  private observeSidenavIsHidden(): void {
    this.effectsService.sidenavIsHidden.subscribe((isHidden) => {
      const nativeElement = this.main.nativeElement;

      if (isHidden) {
        nativeElement.classList.add('layout-hidden-sidenav');
      } else {
        nativeElement.classList.remove('layout-hidden-sidenav');
      }
    });
  }
}
