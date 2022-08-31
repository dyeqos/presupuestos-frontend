import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EgresosComponent } from './pages/egresos/egresos.component';
import { IngresosComponent } from './pages/ingresos/ingresos.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

const routes: Routes = [
  {
    path:'',
    children:[
      { path: '', component: ReportesComponent },
      { path: 'ingresos', component: IngresosComponent },
      { path: 'egresos', component: EgresosComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
