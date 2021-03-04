import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tableSize: Number;

  constructor() {
    this.tableSize = 10;
  }

  title = 'Sovnheim\'s Trove of Not-So-Random Encounters';
}
