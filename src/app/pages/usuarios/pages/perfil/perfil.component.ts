import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ParametrosService } from 'src/app/services/parametros.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { UsuarioService } from '../../services/usuario.service';

import { Parametro } from 'src/app/interfaces/parametros.interfaces';
import { Usuario } from '../../interfaces/usuario.interfaces';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  roles!: Parametro[];
  usuario!: Usuario; 
  hide: Boolean = true;
  hide2: Boolean = true;

  formUsuario: FormGroup = this.fb.group({
    nombre    : [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
    paterno   : [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
    materno   : [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
    correo    : [ '', [Validators.required, Validators.email] ],
    rol       : [ '', [Validators.required] ],
    password  : [ '', [Validators.required, Validators.minLength(6) ] ],
    password2 : [ '', [Validators.required] ],
  }, {
    validators: [ this.vs.contrasenaIgual('password','password2') ]
  });
  
  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private parametrosService: ParametrosService,
               private vs: ValidatorService ) {} 

  ngOnInit(): void {
    this.cargarRol();
    this.cargarUsuario();
  }

  cargarRol(){
    this.parametrosService.getRoles()
      .subscribe( resp => {
        if(resp.ok===true){
          this.roles = resp.data!;
        }
    });
  }

  cargarUsuario(){
    this.usuarioService.getPerfil()
      .subscribe( resp => {
        if(resp.ok===true){
          this.usuario = resp.data!;
          this.formUsuario.controls['nombre'].setValue(this.usuario.nombre);
          this.formUsuario.controls['paterno'].setValue(this.usuario.paterno);
          this.formUsuario.controls['materno'].setValue(this.usuario.materno);
          this.formUsuario.controls['correo'].setValue(this.usuario.correo);
          this.formUsuario.controls['rol'].setValue(this.usuario.rol._id);
          
        }
    });
  }

  guardarUsuario(){
 
    if( this.formUsuario.invalid ){
      this.formUsuario.markAllAsTouched();
      return;
    }

    this.usuario.nombre = this.formUsuario.controls['nombre'].value.trim().toUpperCase();
    this.usuario.paterno = this.formUsuario.controls['paterno'].value.trim().toUpperCase();
    this.usuario.materno = this.formUsuario.controls['materno'].value.trim().toUpperCase();
    this.usuario.correo = this.formUsuario.controls['correo'].value.trim().toLowerCase();
    this.usuario.rol = this.formUsuario.controls['rol'].value;
    this.usuario.password = this.formUsuario.controls['password'].value;
    
  

    console.log("paso")
    this.usuarioService.putUsuario(this.usuario)
      .subscribe( resp => {
        if(resp.ok===true){
          //this.dialogRef.close(true);
        }else{
          //this.dialogRef.close(false);
        }
    });
    
  }

 
}
