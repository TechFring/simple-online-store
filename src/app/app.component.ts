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
  private sidenavIsHidden: boolean;

  @ViewChild('content') content: ElementRef;

  constructor(public effectsService: EffectsService) {}

  ngOnInit(): void {
    this.observeDarkMode();
  }

  ngAfterViewInit(): void {
    this.observeSidenavIsHidden();
  }

  /* EVENTS */
  onClickBlur(): void {
    if (!this.sidenavIsHidden) {
      this.effectsService.handleSidenav(false);
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

  private observeSidenavIsHidden(): void {
    this.effectsService.sidenavIsHidden.subscribe((isHidden) => {
      this.sidenavIsHidden = isHidden;
      const nativeElement = this.content.nativeElement;

      if (isHidden) {
        nativeElement.classList.remove('blur');
        document.body.style.overflowY = "auto";
      } else {
        nativeElement.classList.add('blur');
        document.body.style.overflowY = "hidden";
      }
    });
  }
}
