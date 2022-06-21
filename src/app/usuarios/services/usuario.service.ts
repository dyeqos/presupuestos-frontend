import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario, UsuarioResponse } from '../interfaces/usuario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }
  
  getUsuarios(){
    const url = `${this.baseUrl}/usuarios/`;
    return this.http.get<UsuarioResponse>(url);
  }

  postUsuario( datos:Usuario ){
    const url = `${this.baseUrl}/usuarios/`;
    // let header = {
    //   headers: new HttpHeaders()
    //     .set('Authorization',  `Basic ${}`)
    // }
    return this.http.post(url,datos);
  }
}
