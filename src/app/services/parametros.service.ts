import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { parametroResponse } from '../interfaces/parametros.interfaces';
@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  private baseUrl: string = environment.baseUrl + "/params";
  
  constructor( private http: HttpClient) { }

  getRoles(){

    const url = `${this.baseUrl}/roles`;

    return this.http.get<parametroResponse>(url);
  }


}
