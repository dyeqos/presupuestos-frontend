import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'

import { authResponse } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _Token! : string;

  get token(){
    return this._Token;
  }
   
  constructor( private http: HttpClient ) { }

  login( correo: string, password: string){

    const url = `${this.baseUrl}/auth/login`;
    const body = { correo, password };
    return this.http.post<authResponse>(url, body)
      .pipe(
        tap( ({ ok, msg }) => {
          if( ok ){
            localStorage.setItem('token', msg )
          }
        }),
        map(resp => resp.ok),
        catchError( err => of( err ) )
        //catchError( err => of( err.error.msg ) )
      );
  }

  validarToken(){
    const url     =  `${this.baseUrl}/auth/validarJWT`;
    const headers =  new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<authResponse>(url, { headers } )
      .pipe(
        map( resp => {
          if( resp.ok ){
            this._Token = resp.msg;
            localStorage.setItem('token',resp.msg )
          }
          return resp.ok
        }),
        catchError( err => of(false))
      );
  }

  logout(){
    localStorage.removeItem('token');
  }
}
