import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentasRoutingModule } from './cuentas-routing.module';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { CuentasModalComponent } from './pages/cuentas-modal/cuentas-modal.component';


@NgModule({
  declarations: [
    CuentasComponent,
    CuentasModalComponent
  ],
  imports: [
    CommonModule,
    CuentasRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class CuentasModule { }
