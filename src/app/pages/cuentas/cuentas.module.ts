import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentasRoutingModule } from './cuentas-routing.module';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    CuentasComponent
  ],
  imports: [
    CommonModule,
    CuentasRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class CuentasModule { }
