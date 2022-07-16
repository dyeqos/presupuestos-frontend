import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivosComponent } from './pages/activos/activos.component';
import { MisActivosComponent } from './pages/mis-activos/mis-activos.component';

const routes: Routes = [
  {
    path:'',
    children:[
      { path: '', component: MisActivosComponent },
      { path: 'cotizacion', component: ActivosComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivosRoutingModule { }
