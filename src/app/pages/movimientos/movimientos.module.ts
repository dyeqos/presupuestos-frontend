import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material/material.module';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { IngresosComponent } from './pages/ingresos/ingresos.component';
import { EgresosComponent } from './pages/egresos/egresos.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IngresosComponent,
    EgresosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MovimientosRoutingModule,
    MaterialModule
  ]
})
export class MovimientosModule { }
