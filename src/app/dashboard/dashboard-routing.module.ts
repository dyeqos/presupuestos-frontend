import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppNavbarComponent } from '../shared/app-navbar/app-navbar.component';

const routes: Routes = [
  {
    path: '',
    component: AppNavbarComponent,
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
