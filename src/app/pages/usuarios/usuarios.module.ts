import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MaterialModule } from '../../material/material.module';

import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuariosModalComponent } from './pages/usuarios-modal/usuarios-modal.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosModalComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class UsuariosModule { }
