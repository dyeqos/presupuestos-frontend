import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuMasterComponent } from '../shared/menu-master/menu-master.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MenuMasterComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
