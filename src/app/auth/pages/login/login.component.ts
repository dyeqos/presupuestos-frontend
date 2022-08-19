import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: Boolean = true;
  formLogin: FormGroup = this.fb.group({
    usuario : ['dyeqos@gmail.com',[Validators.required, Validators.email, Validators.maxLength(30)] ],
    password: ['123456',[Validators.required, Validators.minLength(6), Validators.maxLength(30)] ],
    //usuario : ['',[Validators.required, Validators.email, Validators.maxLength(30)] ],
    //password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(30)] ],
  });
  
  constructor( private router: Router,
               private _snackBar: MatSnackBar,
               private fb: FormBuilder,
               private authService: AuthService) { }

  ngOnInit(): void {
  }

  ingresar(){

    if( this.formLogin.invalid ){
      this.formLogin.markAllAsTouched();
      return;
    }
    const { usuario, password } = this.formLogin.value;
    this.authService.login(usuario, password)
      .subscribe( ok => {
        if( ok === true ){
          this.router.navigate(['/dashboard']);
        }else{
          //Error autenticación
          if( ok.status === 0 ) {
            this.abrirSnackBar("No hay conexión con el Servidor");  
          }else{
            this.abrirSnackBar( ok.error.msg );
          }
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
