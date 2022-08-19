import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

public soloLetras: string = '([a-zA-Z]+) ([a-zA-Z]+)';
public soloEmail : string = "^[a-z0-9.%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

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
}
