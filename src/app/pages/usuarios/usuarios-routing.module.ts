import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';

import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  {
    path:'',
    children:[
      { path: '', component: UsuariosComponent },
      { path: 'mi-perfil', component: PerfilComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
