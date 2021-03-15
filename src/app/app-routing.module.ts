import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncounterTableComponent } from './encounter-table/encounter-table.component';

const routes: Routes = [
  { path: '', component: EncounterTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
