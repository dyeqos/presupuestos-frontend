import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { PagesComponent } from './pages/pages.component';
import { MovimientosModule } from './pages/movimientos/movimientos.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'dashboard',
    component: PagesComponent,
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardModule ),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'usuarios',
    component: PagesComponent,
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosModule ),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'cuentas',
    component: PagesComponent,
    loadChildren: () => import('./pages/cuentas/cuentas.module').then( m => m.CuentasModule ),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'activos',
    component: PagesComponent,
    loadChildren: () => import('./pages/activos/activos.module').then( m => m.ActivosModule ),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'compras',
    component: PagesComponent,
    loadChildren: () => import('./pages/compras/compras.module').then( m => m.ComprasModule ),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'movimientos',
    component: PagesComponent,
    loadChildren: () => import('./pages/movimientos/movimientos.module').then( m => m.MovimientosModule ),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
