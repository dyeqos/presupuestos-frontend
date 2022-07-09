import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaBorradoComponent } from './alerta-borrado/alerta-borrado.component';

import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AlertaBorradoComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    AlertaBorradoComponent
  ]
})
export class ComponentsModule { }
