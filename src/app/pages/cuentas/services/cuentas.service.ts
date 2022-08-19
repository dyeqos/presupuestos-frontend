import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Cuenta, CuentaResponse } from '../interfaces/cuenta.interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  private baseUrl: string = environment.baseUrl + "/cuentas";
  
  constructor( private http: HttpClient,
               private authService: AuthService ) { }

  getCuentas(uid:string=''){
    const url = `${this.baseUrl}/${uid}`;
    return this.http.get<CuentaResponse>(url);
  }

  getMisCuentas(){
    const url = `${this.baseUrl}/mis-cuentas`;
    const headers = new HttpHeaders()
      .set('x-token', this.authService.token );
      return this.http.get<CuentaResponse>(url, { headers });
  }

  postCuenta(datos: Cuenta){
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders()
      .set('x-token', this.authService.token )
    return this.http.post<CuentaResponse>(url, datos, { headers });
  }

  putCuenta(datos: Cuenta){
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders()
      .set('x-token', this.authService.token )

    return this.http.put<CuentaResponse>(url, datos, { headers });
  }

}
