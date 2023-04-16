import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { ParametroResponse } from '../interfaces/parametros.interfaces';
@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  private baseUrl: string = environment.baseUrl + "/params";
  
  constructor( private http: HttpClient ) { }

  getRoles(){
    const url = `${this.baseUrl}/roles`;
    return this.http.get<ParametroResponse>(url);
  }

  getTiposActivos(){
    const url = `${this.baseUrl}/tipos-activos`;
    return this.http.get<ParametroResponse>(url);
  }

  getBancos(){
    const url = `${this.baseUrl}/bancos`;
    return this.http.get<ParametroResponse>(url);
  }

  getTiposCuentas(){
    const url = `${this.baseUrl}/cuentas`;
    return this.http.get<ParametroResponse>(url);
  }

  getTiposIngresos(){
    const url = `${this.baseUrl}/ingresos`;
    return this.http.get<ParametroResponse>(url);
  }

  getTiposEgresos(){
    const url = `${this.baseUrl}/egresos`;
    return this.http.get<ParametroResponse>(url);
  }

}
