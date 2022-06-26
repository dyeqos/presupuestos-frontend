import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent
  ],
  imports: [
    MaterialModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    ToolbarComponent
  ]
})
export class SharedModule { }
