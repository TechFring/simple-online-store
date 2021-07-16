import { Component } from '@angular/core';

import { EffectsService } from './services/effects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'simple-online-store';

  constructor(public effectsService: EffectsService) {}
}
