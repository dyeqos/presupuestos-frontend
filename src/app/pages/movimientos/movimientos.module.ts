import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material/material.module';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { IngresosComponent } from './pages/ingresos/ingresos.component';
import { EgresosComponent } from './pages/egresos/egresos.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { FormArrayComponent } from './components/form-array/form-array.component';


@NgModule({
  declarations: [
    IngresosComponent,
    EgresosComponent,
    ReportesComponent,
    FormArrayComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MovimientosRoutingModule,
    MaterialModule
  ]
})
export class MovimientosModule { }
