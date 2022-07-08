import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UsuarioService } from '../../services/usuario.service';
import { ParametrosService } from '../../../../services/parametros.service';
import { Usuario } from '../../interfaces/usuario.interfaces';

import { UsuariosModalComponent } from '../usuarios-modal/usuarios-modal.component';
import { parametro } from 'src/app/interfaces/parametros.interfaces';
 
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  displayHeader: string[] = ["nombre","correo","rol","opcion"];
  usuariosList!: Usuario[];
  rolesList!: parametro[];
  usuario: Usuario = {
    nombre:'',
    paterno:'',
    materno:'',
    correo:'',
    uid:'',
    rol: {
      _id:'',
      nombre:''
    }
  }

  constructor( private usuarioService: UsuarioService,
               private parametrosService: ParametrosService,
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
        disableClose: false,
        data: {
          roles : this.rolesList
        }
    })
  }

  editar( uid: string){

    this.usuarioService.getUsuarios(uid)
      .subscribe( resp => {
        if(resp.ok === true) {

          this.dialog.open( UsuariosModalComponent, {
            width: "500px",
            disableClose: false,
            data: {
              roles : this.rolesList,
              usuario: resp.data! 
            }
          })
          
        }
      })
    
  }



}
