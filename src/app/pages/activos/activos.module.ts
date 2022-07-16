import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material/material.module';

import { ActivosRoutingModule } from './activos-routing.module';
import { MisActivosComponent } from './pages/mis-activos/mis-activos.component';
import { ActivosComponent } from './pages/activos/activos.component';
import { ActivosModalComponent } from './pages/activos-modal/activos-modal.component';


@NgModule({
  declarations: [
    MisActivosComponent,
    ActivosComponent,
    ActivosModalComponent
  ],
  imports: [
    CommonModule,
    ActivosRoutingModule,
    ReactiveFormsModule,    
    MaterialModule
  ]
})
export class ActivosModule { }
