import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { ParametroResponse } from '../interfaces/parametros.interfaces';
@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  private baseUrl: string = environment.baseUrl + "/params";
  
  constructor( private http: HttpClient) { }

  getRoles(){

    const url = `${this.baseUrl}/roles`;

    return this.http.get<ParametroResponse>(url);
  }

  getTiposActivos(){
    const url = `${this.baseUrl}/tipos-activos`;
    return this.http.get<ParametroResponse>(url);
  }


}
