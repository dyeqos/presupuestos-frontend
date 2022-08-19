import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../interfaces/usuario.interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios-modal',
  templateUrl: './usuarios-modal.component.html',
  styleUrls: ['./usuarios-modal.component.css']
})
export class UsuariosModalComponent implements OnInit {

  //comboBox roles
  roles = this.data.roles;
  usuario:Usuario = this.data.usuario || {}; 

  formUsuario: FormGroup = this.fb.group({
    nombre   : [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
    paterno  : [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
    materno  : [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
    correo   : [ '', [Validators.required, Validators.email] ],
    rol      : [ '', [Validators.required] ],
    password : ['123456', [Validators.required, Validators.minLength(6)] ],
  });
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private dialogRef: MatDialogRef<UsuariosModalComponent>,
               private fb: FormBuilder,
               private usuarioService: UsuarioService ) {} 

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario(){
    if(this.usuario.uid){

      this.formUsuario.controls['nombre'].setValue(this.usuario.nombre);
      this.formUsuario.controls['paterno'].setValue(this.usuario.paterno);
      this.formUsuario.controls['materno'].setValue(this.usuario.materno);
      this.formUsuario.controls['correo'].setValue(this.usuario.correo);
      this.formUsuario.controls['rol'].setValue(this.usuario.rol._id);
    }
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
    
    if( typeof this.usuario.uid !== 'undefined' ){
      this.usuarioService.putUsuario(this.usuario)
        .subscribe( resp => {
          if(resp.ok===true){
            this.dialogRef.close(true);
          }else{
            this.dialogRef.close(false);
          }
      });
    }else{
     
      this.usuarioService.postUsuario(this.usuario)
        .subscribe( resp => {
          if(resp.ok===true){
            this.dialogRef.close(true);
          }else{
            this.dialogRef.close(false);
          }
      });
      
    }
    
  }

 
}
