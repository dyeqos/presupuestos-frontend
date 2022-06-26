import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios-modal',
  templateUrl: './usuarios-modal.component.html',
  styleUrls: ['./usuarios-modal.component.css']
})
export class UsuariosModalComponent implements OnInit {

  formUsuario: FormGroup = this.fb.group({
    nombre : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
    paterno: ['',[Validators.minLength(3), Validators.maxLength(30)] ],
    materno: ['',[Validators.minLength(3), Validators.maxLength(30)] ],
    correo : ['',[Validators.required, Validators.email] ],
    rol    : ['',[Validators.required] ],
  });

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private fb: FormBuilder,
               private usuarioService: UsuarioService ) {
    //this.nombre = data.nombre;
    //console.log(data)
   }

  ngOnInit(): void {
  }

  guardarUsuario(){
    if( this.formUsuario.invalid ){
      this.formUsuario.markAllAsTouched();
      console.log( this.formUsuario )
      return;
    }
console.log("otro")
    this.usuarioService.postUsuario(this.formUsuario.value).subscribe( resp => {
      console.log(resp);
    }) ;
    
  }
 
}
