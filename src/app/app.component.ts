import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  events: string[] = [];

  opened: boolean;

  title = 'Sovnheim\'s Trove of D&D Stuff';
}
