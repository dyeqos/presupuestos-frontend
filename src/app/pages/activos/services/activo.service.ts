import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Activo, ActivosResponse } from '../interfaces/activos.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient,
               private authService: AuthService ) { }

  getActivos(uid: String = ''){
    const url = `${this.baseUrl}/activos/cotizacion/${uid}`;
    return this.http.get<ActivosResponse>(url);
  }

  postActivos(datos: Activo ){
    const url = `${this.baseUrl}/activos`;
    const headers = new HttpHeaders()
      .set('x-token', this.authService.token )
    return this.http.post<ActivosResponse>(url,datos,{headers});
  }

  updateActivo(datos: Activo ){
    const url = `${this.baseUrl}/activos/cotizacion`;
    const headers = new HttpHeaders()
      .set('x-token', this.authService.token )
    return this.http.put<ActivosResponse>(url,datos,{headers});
  }

  updateActivos(datos: Activo[]){
    const url = `${this.baseUrl}/activos`;
    const headers = new HttpHeaders()
      .set('x-token', this.authService.token )
    return this.http.put<ActivosResponse>(url,datos,{headers});
  }
  deleteActivo(uid: String = ''){
    const url = `${this.baseUrl}/activos/cotizacion`;
    const option = {
      headers : new HttpHeaders()
        .set( 'x-token', this.authService.token )
        .set( 'content-type', 'application/json' ),
      body: { uid }
    }
    return this.http.delete<ActivosResponse>(url,option);
  }

}
