import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

import { ComprasService } from '../../services/compras.service';
import { CuentasService } from '../../../cuentas/services/cuentas.service';

import { Cuenta } from 'src/app/pages/cuentas/interfaces/cuenta.interfaces';
import { Movimiento } from '../../interfaces/compras.interfaces';

@Component({
  selector: 'app-compra-modal',
  templateUrl: './compra-modal.component.html',
  styleUrls: ['./compra-modal.component.css']
})
export class CompraModalComponent implements OnInit {

  activo: string = this.data.nombreActivo || '';
  uid : string = this.data.uidActivo || '';
  cuentas!: Cuenta[];
  movimiento!: Movimiento;
  hoy = new Date();

  formCompra: FormGroup = this.fb.group({
    lugar_compra : [ '', [Validators.required, Validators.minLength(5), Validators.maxLength(50)] ],
    cuenta       : [ '', [Validators.required] ],
    fecha_compra : [ {value: this.hoy, disabled: true}, [Validators.required] ],
  });

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private dialogRef: MatDialogRef<CompraModalComponent>,
               private _snackBar: MatSnackBar,
               private fb: FormBuilder,           
               private cs: CuentasService,
               private cos: ComprasService ) { }

  ngOnInit(): void {
    this.getCuentas();
  }

  getCuentas( ){
    this.cs.getCuentas()
      .subscribe( resp => {
        if( resp.ok === true ){
          this.cuentas = resp.data!;
        }
      })
  }

  guardarCompra(){

    if( this.formCompra.invalid ){
      this.formCompra.markAllAsTouched();
      return;
    }
    
    this.movimiento = {
      fecha_compra :  moment(this.formCompra.controls['fecha_compra'].value).format('YYYY-MM-DD'),
      cuenta : this.formCompra.controls['cuenta'].value,
      lugar_compra : this.formCompra.controls['lugar_compra'].value.trim().toUpperCase(),
    }

    this.cos.postCompra(this.uid, this.movimiento)
      .subscribe(resp => {
        if(resp.ok === true){
          this.dialogRef.close(true);
        }else{
          this.abrirSnackBar(resp.msg);
        }
      })
  }

  abrirSnackBar(msg: String){
    this._snackBar.open(msg.toString(),'Aceptar',{
      horizontalPosition : 'end',
      verticalPosition: 'top',
      duration: 1500
    })
  }

}
