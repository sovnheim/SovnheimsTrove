import { Component } from '@angular/core';
// import { TableData } from './service/tabledata';
import { getTableData } from './service/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Sovnheim\'s Trove of Not-So-Random Encounters';

  displayedColumns: string[] = ['ID', 'Encounter Name', 'Encounter Description', 'Rarity', 'Encounter Type'];

  dataSource = getTableData();
  // dataSource = TableData.records;
}
