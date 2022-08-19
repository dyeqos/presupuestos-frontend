import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MaterialModule } from '../../material/material.module';

import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuariosModalComponent } from './pages/usuarios-modal/usuarios-modal.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosModalComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class UsuariosModule { }
