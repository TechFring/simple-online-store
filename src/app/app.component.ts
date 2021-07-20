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
  private sidenavIsShowing: boolean;

  @ViewChild('content') content: ElementRef;

  constructor(public effectsService: EffectsService) {}

  ngOnInit(): void {
    this.observeDarkMode();
  }

  ngAfterViewInit(): void {
    this.observeSidenavIsShow();
  }

  /* EVENTS */
  onClickBlur(): void {
    if (this.sidenavIsShowing) {
      this.effectsService.handleSidenav(true);
    }
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

  private observeSidenavIsShow(): void {
    this.effectsService.sidenavIsShowing.subscribe((isShowing) => {
      window.setTimeout(() => {
        this.sidenavIsShowing = isShowing;
        const nativeElement = this.content.nativeElement;

        if (isShowing) {
          nativeElement.classList.add('blur');
          document.body.style.overflowY = 'hidden';
        } else {
          nativeElement.classList.remove('blur');
          document.body.style.overflowY = 'auto';
        }
      }, 100);
    });
  }
}
