import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/auth/services/auth.service';

import { Ingreso } from '../interfaces/ingresos.interfaces';
import { MovimientosResponse } from '../interfaces/movimientos.interfaces';
import { BusquedaMovimientos } from '../interfaces/busqueda.interfaces';
import { Egreso } from '../interfaces/egresos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient,
               private authService: AuthService ) { }

  postMovimientoIngreso(datos: Ingreso ){
    const url = `${this.baseUrl}/movimientos/ingreso`;
    const headers = new HttpHeaders()
      .set('x-token', this.authService.token )
    return this.http.post<MovimientosResponse>(url,datos,{headers});
  }

  postMovimientoEgreso(datos: Egreso ){
    const url = `${this.baseUrl}/movimientos/egreso`;
    const headers = new HttpHeaders()
      .set('x-token', this.authService.token )
    return this.http.post<MovimientosResponse>(url,datos,{headers});
  }

  postGetMovimientos( datos: BusquedaMovimientos ){
    const url = `${this.baseUrl}/movimientos/`;
    return this.http.post<MovimientosResponse>(url,datos);
  }



}
