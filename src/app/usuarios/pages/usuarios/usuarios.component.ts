import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Usuario } from '../../interfaces/usuario.interfaces';
import { UsuarioService } from '../../services/usuario.service';

import { UsuariosModalComponent } from '../usuarios-modal/usuarios-modal.component';
 
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  displayHeader: string[] = ["nombre","correo","rol","opcion"];
  usuariosList!: Usuario[];

  constructor( private usuarioService: UsuarioService,
               public dialog: MatDialog ) { }
 
  ngOnInit(): void {
    this.getUsuarios();
   
  }

  getUsuarios(){

    this.usuarioService.getUsuarios()
      .subscribe( resp => {
        if( resp.data ){
          this.usuariosList = resp.data;
        }else{
          this.usuariosList = [];
        }
      });
  }

  abrirModal(){
    this.dialog.open( UsuariosModalComponent, {
        width: "500",
        disableClose: false,
        data: {
          nombre : 'diego'
        }
    })
  }



}
