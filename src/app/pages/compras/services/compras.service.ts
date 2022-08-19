import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Movimiento, ComprasResponse } from '../interfaces/compras.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private baseUrl: string = environment.baseUrl + "/compras";

  constructor( private http: HttpClient,
               private authService: AuthService ) { }

  postCompra(uidActivo: string, datos: Movimiento){
    const url = `${this.baseUrl}/${uidActivo}`;
    const headers = new HttpHeaders()
      .set('x-token', this.authService.token )
    return this.http.post<ComprasResponse>(url, datos, { headers })
      .pipe(
        map( resp =>  resp ),
        catchError( err => of({
                        ok:err.error.ok,
                        msg:err.error.msg
                        }) 
                  )
      );
  }

}
