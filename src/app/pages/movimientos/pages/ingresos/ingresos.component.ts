import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuenta } from 'src/app/pages/cuentas/interfaces/cuenta.interfaces';
import { CuentasService } from '../../../cuentas/services/cuentas.service';
import { ParametrosService } from '../../../../services/parametros.service';
import { Parametro } from '../../../../interfaces/parametros.interfaces';
import { Ingreso } from '../../interfaces/ingresos.interfaces';
import * as moment from 'moment';
import { MovimientosService } from '../../services/movimientos.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  date = new Date(); 
  numeroCuenta! : Cuenta[];
  ingresos! : Parametro[];

  ingreso!: Ingreso;

  formIngreso: FormGroup = this.fb.group({
    fecha      : [ {value: this.date, disabled: true}, [ Validators.required ] ],
    cuenta     : [ '', [ Validators.required ] ],
    ingreso    : [ '', [ Validators.required ] ],
    detalle    : [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(150) ] ],
    unitario   : [ '', [ Validators.required, Validators.min(1) ] ],
  });

  constructor( private fb: FormBuilder,
               private cs: CuentasService,
               private ps: ParametrosService,
               private ms: MovimientosService ) { }

  ngOnInit(): void {
    this.listarCuentas();
    this.listarTiposIngresos();
  }

  listarCuentas(){
    this.cs.getMisCuentas()
      .subscribe(resp => {
        if( resp.ok === true ){
          this.numeroCuenta = resp.data!;
        }else{
          this.numeroCuenta = [];
        }
      })
  }

  listarTiposIngresos(){
    this.ps.getTiposIngresos()
      .subscribe(resp => {
        if( resp.ok === true ){
          this.ingresos = resp.data!;
        }else{
          this.ingresos = [];
        }
      })
  }

  guardarIngreso(){
    if( this.formIngreso.invalid ){
      this.formIngreso.markAllAsTouched();
      return;
    }
  
    this.ingreso = {
      fecha_compra : moment(this.formIngreso.controls['fecha'].value).format('YYYY-MM-DD') ,
      cuenta       : this.formIngreso.controls['cuenta'].value,
      lugar_compra : this.formIngreso.controls['detalle'].value.trim().toUpperCase(),
      //detalleMovimiento
      nombre       : this.formIngreso.controls['ingreso'].value.trim().toUpperCase(),
      detalle      : this.formIngreso.controls['detalle'].value.trim().toUpperCase(),
      unitario     : this.formIngreso.controls['unitario'].value
    }

    this.ms.postMovimientoIngreso(this.ingreso)
      .subscribe( resp => {
        if(resp.ok === true ){

        }
        console.log(resp);

      })

  }

}
