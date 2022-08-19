import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ParametrosService } from 'src/app/services/parametros.service';
import { UsuarioService } from '../../../usuarios/services/usuario.service';
import { CuentasService } from '../../services/cuentas.service';

import { Parametro } from 'src/app/interfaces/parametros.interfaces';
import { Usuario } from 'src/app/pages/usuarios/interfaces/usuario.interfaces';
import { Cuenta } from '../../interfaces/cuenta.interfaces';

import { CuentasModalComponent } from '../cuentas-modal/cuentas-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  displayHeader: string[] = ["banco","numero_cuenta","opcion"];
  bancosList!: Parametro[];
  usuarioList!: Usuario[];
  tipoCuentasList!: Parametro[];
  cuentasList!: Cuenta[];


  constructor( private ps: ParametrosService,
               private us: UsuarioService,
               private cs: CuentasService,
               private _snackBar: MatSnackBar,
               public dialog: MatDialog, ) { }

  ngOnInit(): void {
    this.getCuentas();
    this.getBancos();
    this.getUsuarios();
    this.getTipoCuentas();
  }

  getCuentas(){
    this.cs.getCuentas()
      .subscribe( resp => {
        if( resp.ok === true ){
          this.cuentasList = resp.data!;
        }else{
          this.cuentasList = [];
        }
      });
  }

  editar(uid: string){
    this.cs.getCuentas(uid)
      .subscribe( resp => {
        if(resp.ok === true) {

          this.dialog.open( CuentasModalComponent, {
            width: "500px",
            disableClose: true,
            data: {
              bancos: this.bancosList,
              usuarios: this.usuarioList,
              cuentas: this.tipoCuentasList,
              cuenta: resp.data
            }
          }).afterClosed().subscribe( resp => {
            if(resp === true){
              this.getCuentas();
              this.abrirSnackBar("Modificación Exitosa");
            }else if(resp=== false){
              this.abrirSnackBar("Error al Modificar");
            }else{
              //se canceló el modal
            }
          });

        }
      });
  }

  eliminar(uid: string){

  }

  abrirModal(){
 
    this.dialog.open( CuentasModalComponent, {
      width: "500px",
      disableClose: true,
      data: {
         bancos: this.bancosList,
         usuarios: this.usuarioList,
         cuentas: this.tipoCuentasList,
      }
    })
  }

  getBancos(){
    this.ps.getBancos()
      .subscribe( resp => {
        if(resp.ok === true){
          this.bancosList = resp.data!;
        }else{
          this.bancosList = [];
        }
      });
  }

  getUsuarios(){
    this.us.getUsuarios()
      .subscribe(resp => {
        if(resp.ok === true){
          this.usuarioList = resp.data!;
        }else{
          this.usuarioList = [];
        }
      })
  }

  getTipoCuentas(){
    this.ps.getTiposCuentas()
      .subscribe(resp => {
        if(resp.ok === true){
          this.tipoCuentasList = resp.data!;
        }else{
          this.tipoCuentasList = [];
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
