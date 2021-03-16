import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiceBoxComponent } from './dice-box/dice-box.component';
import { EncounterTableComponent } from './encounter-table/encounter-table.component';

const routes: Routes = [
  { path: '', component: EncounterTableComponent },
  { path: 'DiceBox', component: DiceBoxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
