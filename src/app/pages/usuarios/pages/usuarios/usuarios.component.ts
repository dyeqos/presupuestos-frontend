import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UsuarioService } from '../../services/usuario.service';
import { ParametrosService } from '../../../../services/parametros.service';
import { Usuario } from '../../interfaces/usuario.interfaces';

import { UsuariosModalComponent } from '../usuarios-modal/usuarios-modal.component';
import { parametro } from 'src/app/interfaces/parametros.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaBorradoComponent } from 'src/app/components/alerta-borrado/alerta-borrado.component';
 
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  displayHeader: string[] = ["nombre","correo","rol","opcion"];
  usuariosList!: Usuario[];
  rolesList!: parametro[];

  constructor( private usuarioService: UsuarioService,
               private parametrosService: ParametrosService,
               private _snackBar: MatSnackBar,
               public dialog: MatDialog ) { }
 
  ngOnInit(): void {
    this.getUsuarios();
    this.getRoles();
  }

  getRoles(){
    this.parametrosService.getRoles()
      .subscribe(resp=> {
        if( resp.ok === true ){
          this.rolesList = resp.data!;
        }else{
          this.rolesList = [];
        }
      })
  }

  getUsuarios(){
    this.usuarioService.getUsuarios()
      .subscribe( resp => {
        if( resp.ok === true ){
          this.usuariosList = resp.data!;
        }else{
          this.usuariosList = [];
        }
      });
  }

  abrirModal(){
    this.dialog.open( UsuariosModalComponent, {
        width: "500px",
        disableClose: true,
        data: {
          roles : this.rolesList
        }
    }).afterClosed().subscribe( resp => {
      if(resp === true){
        this.getUsuarios();
        this.abrirSnackBar("Registro Exitoso");
      }else{
        this.abrirSnackBar("Error al Registrar");
      }
    })
  }

  editar( uid: string){

    this.usuarioService.getUsuarios(uid)
      .subscribe( resp => {
        if(resp.ok === true) {

          this.dialog.open( UsuariosModalComponent, {
            width: "500px",
            disableClose: true,
            data: {
              roles : this.rolesList,
              usuario: resp.data! 
            }
          }).afterClosed().subscribe( resp => {
            if(resp === true){
              this.getUsuarios();
              this.abrirSnackBar("Modificación Exitosa");
            }else{
              this.abrirSnackBar("Error al Modificar");
            }
          });
        }
      });
  }

  eliminar(uid: string){

    const alertBorrado = this.dialog.open( AlertaBorradoComponent,{
      width: "250px",
      disableClose: true,
      data: { titulo:'Borrar Usuario' }
    } );

    alertBorrado.afterClosed()
      .subscribe( resp => {
        if( resp === true ){
          this.usuarioService.deleteUsuario(uid)
            .subscribe(resp => {
              if( resp.ok === true ){
                this.getUsuarios();
                this.abrirSnackBar("Eliminación Exitosa");
              }
            });
        }
      });
  }

  abrirSnackBar(msg: String){
    this._snackBar.open(msg.toString(),'Aceptar',{
      horizontalPosition : 'end',
      verticalPosition: 'top',
      duration: 1500
    })
  }



}
