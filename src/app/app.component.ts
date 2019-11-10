import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'homemade-pokedex';

  updateAvailable = false;
  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((event) => {
        console.log('New update available');
        this.updateAvailable = true;
      });
    }
  }

  updateApp() {
    window.location.reload();
  }
}
