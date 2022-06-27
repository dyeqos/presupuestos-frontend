import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

import { UsuarioResponse } from '../interfaces/usuario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient,
               private authService: AuthService ) { }
  
  getUsuarios(){
    const url = `${this.baseUrl}/usuarios/`;
    return this.http.get<UsuarioResponse>(url);
  }

  postUsuario( datos: any ){
    const url = `${this.baseUrl}/usuarios/`;
    const headers = new HttpHeaders()
      .set('x-token', this.authService.token )
    
    return this.http.post( url, datos, { headers } );
  }
}
