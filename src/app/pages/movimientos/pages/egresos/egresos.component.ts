import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CuentasService } from 'src/app/pages/cuentas/services/cuentas.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { MovimientosService } from '../../services/movimientos.service';
import { UtilitariosService } from '../../../../shared/Utilitarios/utilitarios.service';

import { Cuenta } from 'src/app/pages/cuentas/interfaces/cuenta.interfaces';
import { Parametro } from 'src/app/interfaces/parametros.interfaces';
import { Egreso, DetalleEgreso } from '../../interfaces/egresos.interfaces';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css']
})
export class EgresosComponent implements OnInit {

  numerosCuenta!: Cuenta[];
  egresos!      : Parametro[];
  date          : Date = new Date();
  egreso!       : Egreso;
  detalleEgreso : DetalleEgreso[] = [];

  formEgreso: FormGroup = this.fb.group({
    fecha : [ {value: this.date, disabled: true}, [Validators.required] ],
    cuenta: [ '', [Validators.required] ],
    motivo: [ '', [Validators.required] ],
    detalles: this.fb.array([])
  });
  
  get detalles(): FormArray{
    return this.formEgreso.get('detalles') as FormArray;
  }

  constructor( private fb: FormBuilder,
               private cs: CuentasService,
               private ms: MovimientosService,
               private ps: ParametrosService,
               private us: UtilitariosService,
               private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.listarCuentas();
    this.listarTiposEgresos();
  }

  nuevoDetalle():FormGroup{
    return this.fb.group({
      cantidad    :[ '', [ Validators.required, Validators.min(1) ] ],
      detalle     :[ '', [ Validators.required ] ],
      unitario    :[ '', [ Validators.required, Validators.min(1) ] ]
    })
  }

  agregarDetalle(){
    if( this.formEgreso.invalid ){
      this.formEgreso.markAllAsTouched();
      return;
    }
    this.detalles.push(this.nuevoDetalle());
  }

  quitarDetalle(i: number){
    this.detalles.removeAt(i);
  }

  listarCuentas(){
    this.cs.getMisCuentas()
      .subscribe(resp => {
        if( resp.ok === true ){
          this.numerosCuenta = resp.data!;
        }else{
          this.numerosCuenta = [];
        }
      })
  }

  listarTiposEgresos(){
    this.ps.getTiposEgresos()
      .subscribe(resp => {
        if( resp.ok === true ){
          this.egresos = resp.data!;
        }else{
          this.egresos = [];
        }
      })
  }

  guardarEgreso( formDirective: FormGroupDirective ){
    if( this.formEgreso.invalid ){
      this.formEgreso.markAllAsTouched();
      return;
    }

    this.formEgreso.controls['detalles'].value.forEach((data: DetalleEgreso) => {
       this.detalleEgreso.push(data);
    });

    this.egreso = {
      fecha_movimiento : this.us.aFecha( this.formEgreso.controls['fecha'].value , 'YYYY-MM-DD' ),
      cuenta: this.formEgreso.controls['cuenta'].value,
      lugar_compra: this.formEgreso.controls['motivo'].value,
      detalle_mov : this.detalleEgreso
    }

    this.ms.postMovimientoEgreso(this.egreso)
      .subscribe( resp => {
        if( resp.ok === true ){
          this.abrirSnackBar("Registro Exitoso");
          this.formEgreso.reset();
          formDirective.resetForm();
        }else{
          this.abrirSnackBar("Error al Registrar")
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
