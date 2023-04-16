import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilitariosService {

  constructor() { }

  esFecha(valor: string): boolean{
    if( moment(valor).isValid() ){
      return true;
    }
    return false;
  }

  aFecha(data: string, format:string): string {
      return moment(data).format(format);
  }

}
