import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { TreeTableComponent } from './tree-table/tree-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'org-chart', pathMatch: 'full' }, // default route
  { path: 'org-chart', component: OrgChartComponent },
  { path: 'table', component: TreeTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
