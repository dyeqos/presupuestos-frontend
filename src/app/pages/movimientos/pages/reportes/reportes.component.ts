import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Cuenta } from 'src/app/pages/cuentas/interfaces/cuenta.interfaces';
import { CuentasService } from 'src/app/pages/cuentas/services/cuentas.service';
import { BusquedaMovimientos } from '../../interfaces/busqueda.interfaces';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { UtilitariosService } from '../../../../shared/Utilitarios/utilitarios.service';
import { MovimientosService } from '../../services/movimientos.service';
import { Movimientos } from '../../interfaces/movimientos.interfaces';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  displayHeader: string[] = ["fecha_movimiento","total","lugar_compra","opcion"];
  movimientosList!: Movimientos[];

  numeroCuenta! : Cuenta[];
  reporte!: BusquedaMovimientos;
  saldoCuenta: number = 0;

  tipoMovimientos = [
      {id : "TODOS",  descripcion : "TODOS"},
      {id : "INGRESO",descripcion : "INGRESOS"},
      {id : "EGRESO", descripcion : "EGRESOS"},
    ];

    formReport: FormGroup = this.fb.group({
      cuenta      : [ '' ],
      fecha_desde : [ '' ],
      fecha_hasta : [ '' ],
      lugar_compra: [ this.tipoMovimientos[0].id, [Validators.required] ]
    }, {
      validators: [ this.vs.esFecha('fecha_desde','fecha_hasta') ]
    });

  constructor( private cs: CuentasService,
               private fb: FormBuilder,
               private vs: ValidatorService,
               private util: UtilitariosService,
               private ms: MovimientosService, ) { }

               
  get cuentaSeleccionado(): boolean{
    return this.formReport.get('cuenta')?.value != '';
  }

  ngOnInit(): void {
    this.listarCuentas();
  }
  
  detalle(){

  }
  revertir(){

  }

  filtrar( formDirective: FormGroupDirective ){

    if( this.formReport.invalid ){
      this.formReport.markAllAsTouched();
      return;
    }

    this.reporte = {
      cuenta: this.formReport.controls['cuenta'].value,
      fecha_desde: this.formReport.controls['fecha_desde'].value === ""?"": this.util.aFecha(this.formReport.controls['fecha_desde'].value, 'YYYY-MM-DD'),
      fecha_hasta: this.formReport.controls['fecha_hasta'].value === ""?"": this.util.aFecha(this.formReport.controls['fecha_hasta'].value, 'YYYY-MM-DD'),
      lugar_compra: this.formReport.controls['lugar_compra'].value,
    }
    
    this.ms.postGetMovimientos( this.reporte )
      .subscribe( resp => {
        if( resp.ok === true ){
          this.movimientosList = resp.data!;
          this.saldoCuenta = parseInt(resp.msg);
          console.log(resp.data)
        }else{
          this.movimientosList = [];
        }

      })

  }

  reset( formDirective: FormGroupDirective ){
    formDirective.resetForm({
      fecha_desde:"",
      fecha_hasta:"",
      lugar_compra: "TODOS"
    });

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
}
