import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { EffectsService } from './services/effects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'simple-online-store';

  @ViewChild('main') main: ElementRef;

  constructor(public effectsService: EffectsService) {}

  ngAfterViewInit(): void {
    this.effectsService.isDarkMode.subscribe((isDarkMode) => {
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    });
  }
}
