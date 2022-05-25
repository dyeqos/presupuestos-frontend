import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuMasterComponent } from '../shared/menu-master/menu-master.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  {
    path:'',
    component: MenuMasterComponent,
    children:[
      { path: '', component: UsuariosComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
