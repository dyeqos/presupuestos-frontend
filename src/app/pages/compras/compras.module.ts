import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material/material.module';

import { ComprasRoutingModule } from './compras-routing.module';
import { CompraModalComponent } from './pages/compra-modal/compra-modal.component';
import { ComprasComponent } from './pages/compras/compras.component';


@NgModule({
  declarations: [
    CompraModalComponent,
    ComprasComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class ComprasModule { }
