import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../interfaces/usuario.interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios-modal',
  templateUrl: './usuarios-modal.component.html',
  styleUrls: ['./usuarios-modal.component.css']
})
export class UsuariosModalComponent implements OnInit {

  formUsuario: FormGroup = this.fb.group({
    nombre   : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
    paterno  : ['', [Validators.minLength(3), Validators.maxLength(30)] ],
    materno  : ['', [Validators.minLength(3), Validators.maxLength(30)] ],
    correo   : ['', [Validators.required, Validators.email] ],
    rol      : ['', [Validators.required] ],
    password : ['123456', [Validators.required, Validators.minLength(6)] ],
  });
  
  //comboBox roles
  roles = this.data.roles;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private fb: FormBuilder,
               private usuarioService: UsuarioService ) {}

  ngOnInit(): void {
  }

  guardarUsuario(){
    if( this.formUsuario.invalid ){
      this.formUsuario.markAllAsTouched();
      console.log( this.formUsuario )
      return;
    }
    
    const body = {
      nombre: this.formUsuario.controls['nombre'].value.trim().toUpperCase(),
      paterno: this.formUsuario.controls['paterno'].value.trim().toUpperCase(),
      materno: this.formUsuario.controls['materno'].value.trim().toUpperCase(),
      correo: this.formUsuario.controls['correo'].value.trim().toLowerCase(),
      rol: this.formUsuario.controls['rol'].value,
      password: this.formUsuario.controls['password'].value
    }


    this.usuarioService.postUsuario(body)
      .subscribe( resp => {
        console.log(resp);
      });
    
  }
 
}
