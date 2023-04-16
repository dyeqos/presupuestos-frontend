import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { UtilitariosService } from '../Utilitarios/utilitarios.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

public soloLetras: string = '([a-zA-Z]+) ([a-zA-Z]+)';
public soloEmail : string = "^[a-z0-9.%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor( private util: UtilitariosService ) { }

  contrasenaIgual( dato1: string, dato2: string){
    return ( FormGroup: AbstractControl ): ValidationErrors | null => {

      const pass1 = FormGroup.get(dato1)?.value;
      const pass2 = FormGroup.get(dato2)?.value;

      if( pass1 !== pass2){
        FormGroup.get(dato2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      }
      FormGroup.get(dato2)?.setErrors( null );
      return null;
    }
  }

  esNumero( dato1: string){
    return ( FormGroup: AbstractControl ): ValidationErrors | null => {
      const dato = FormGroup.get(dato1)?.value;
      if(isNaN(dato)){
        FormGroup.get(dato1)?.setErrors({ noNumero: true });
        return { noNumero: true}
      }
      if(dato.length <= 3){
        FormGroup.get(dato1)?.setErrors({ noTamano: true });
        return { noTamano: true}
      }
      FormGroup.get(dato1)?.setErrors( null );
      return null;
      
    }
  }

  esFecha( fecha1: string, fecha2: string ){

    return ( FormGroup: AbstractControl ): ValidationErrors | null => {
      
      const dt1 = FormGroup.get(fecha1)?.value;
      const dt2 = FormGroup.get(fecha2)?.value;

      if( dt1 !== "" || dt2!=="" ){
        console.log("dat")
        if( this.util.esFecha(dt1) && this.util.esFecha(dt2) ){
          FormGroup.get(fecha1)?.setErrors( null );
          return null;
        }
        FormGroup.get(fecha1)?.setErrors({ noValid: true });
        return { noValid: true}
      }
      FormGroup.get(fecha1)?.setErrors( null );
      return null;
    }

  }

}
