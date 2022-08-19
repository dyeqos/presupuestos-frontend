import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ValidatorService } from '../../../../shared/validators/validator.service';

import { Cuenta } from '../../interfaces/cuenta.interfaces';
import { CuentasService } from '../../services/cuentas.service';

@Component({
  selector: 'app-cuentas-modal',
  templateUrl: './cuentas-modal.component.html',
  styleUrls: ['./cuentas-modal.component.css']
})
export class CuentasModalComponent implements OnInit {
 
  cuenta: Cuenta = this.data.cuenta || {};
  bancos = this.data.bancos;
  tipo_cuentas = this.data.cuentas;
  usuarios = this.data.usuarios;

formCuenta: FormGroup = this.fb.group({
  banco         : [ '', [Validators.required] ],
  numero_cuenta : [ '', [Validators.required] ],
  tipo_cuenta   : [ '', [Validators.required] ],
  usuario       : [ '', [Validators.required] ],
  descripcion   : [ '', [Validators.required] ],
},{
  validators: [ this.vs.esNumero('numero_cuenta') ]
});

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private vs: ValidatorService,
               private cs: CuentasService,
               private fb: FormBuilder,
               private dialogRef: MatDialogRef<CuentasModalComponent> ) { }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario(){
    if(this.cuenta.uid){
      this.formCuenta.controls['banco'].setValue(this.cuenta.banco._id);
      this.formCuenta.controls['numero_cuenta'].setValue(this.cuenta.numero_cuenta);
      this.formCuenta.controls['tipo_cuenta'].setValue(this.cuenta.tipo_cuenta._id);
      this.formCuenta.controls['usuario'].setValue(this.cuenta.usuario._id);
      this.formCuenta.controls['descripcion'].setValue(this.cuenta.descripcion);
    }
  }

  guardarCuenta(){

    if( this.formCuenta.invalid ){
      this.formCuenta.markAllAsTouched();
      return;
    }
    
    this.cuenta.banco = this.formCuenta.controls['banco'].value;
    this.cuenta.numero_cuenta = this.formCuenta.controls['numero_cuenta'].value;
    this.cuenta.tipo_cuenta = this.formCuenta.controls['tipo_cuenta'].value;
    this.cuenta.usuario = this.formCuenta.controls['usuario'].value;
    this.cuenta.descripcion = this.formCuenta.controls['descripcion'].value.trim().toUpperCase();


    if( typeof this.cuenta.uid !== 'undefined' ){
      this.cs.putCuenta(this.cuenta)
      .subscribe( resp => {
        if(resp.ok===true){
          this.dialogRef.close(true);
        }else{
          this.dialogRef.close(false);
        }
    });
    }else{
      this.cs.postCuenta(this.cuenta)
        .subscribe( resp => {
          if(resp.ok === true){
            this.dialogRef.close(true);
          }else{
            this.dialogRef.close(false);
          }
        })
    }

  }
}
