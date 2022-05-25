import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interfaces';
import { UsuarioService } from '../../services/usuario.service';
 
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  displayHeader: string[] = ["nombre","correo","rol"];
  usuariosList!: Usuario[];

  constructor( private usuarioService: UsuarioService ) { }
 
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

}
