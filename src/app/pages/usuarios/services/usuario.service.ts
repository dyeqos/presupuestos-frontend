import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

import { Usuario, UsuarioResponse } from '../interfaces/usuario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient,
               private authService: AuthService ) { }
  
  getUsuarios( uid:string = '' ){
    const url = `${this.baseUrl}/usuarios/${uid}`;
    return this.http.get<UsuarioResponse>(url);
  }

  postUsuario( datos: Usuario ){
    const url = `${this.baseUrl}/usuarios/`;
    const headers = new HttpHeaders()
      .set('x-token', this.authService.token )
    
    return this.http.post<UsuarioResponse>( url, datos, { headers } );
  }

  putUsuario( datos: Usuario ){
    const url = `${this.baseUrl}/usuarios/`;
    const headers = new HttpHeaders()
      .set('x-token', this.authService.token )
    
    return this.http.put<UsuarioResponse>( url, datos, { headers } );
  }

  deleteUsuario( uid: string ){
    const url = `${this.baseUrl}/usuarios/`;
    const option = {
      headers : new HttpHeaders()
        .set( 'x-token', this.authService.token )
        .set( 'content-type', 'application/json' ),
      body: { uid }
    }
    
    return this.http.delete<UsuarioResponse>( url, option);
  }

}
