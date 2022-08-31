import { Component, OnInit } from '@angular/core';
import { Cuenta } from 'src/app/pages/cuentas/interfaces/cuenta.interfaces';
import { CuentasService } from 'src/app/pages/cuentas/services/cuentas.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  displayHeader: string[] = ["fecha","numero_cuenta","opcion"];
  movimientosList = [{
    fecha: '10-10-2022',
    numero_cuenta:'1123123'
  }];

  numeroCuenta! : Cuenta[];
  tipoMovimientos = [
      {id:1,descripcion:"INGRESOS"},
      {id:2,descripcion:"EGRESOS"},
    ];

  constructor(private cs: CuentasService) { }


  ngOnInit(): void {
    this.listarCuentas();
  }
  
  detalle(){

  }
  revertir(){

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
