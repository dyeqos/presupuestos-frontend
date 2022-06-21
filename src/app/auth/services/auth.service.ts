import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { authResponse } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  
  constructor( private http: HttpClient ) { }

  login( correo: string, password: string){

    const url = `${this.baseUrl}/auth/login`;
    const body = { correo, password };
    return this.http.post<authResponse>(url, body);
  }
}
