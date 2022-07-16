import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

import { ActivoService } from '../../services/activo.service';

import { Activo } from '../../interfaces/activos.interfaces';
import { Parametro } from 'src/app/interfaces/parametros.interfaces';

@Component({
  selector: 'app-activos-modal',
  templateUrl: './activos-modal.component.html',
  styleUrls: ['./activos-modal.component.css'],
  })
export class ActivosModalComponent implements OnInit {

  tipo_activo = this.data.tiposActivos;
  date = new Date();
  activo: Activo = this.data.activo || {};

  formActivo: FormGroup = this.fb.group({
    nombre     : [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
    detalle    : [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
    costo      : [ '', [Validators.required, Validators.min(0) ] ],
    fecha      : [ {value: this.date, disabled: true}, [Validators.required] ],
    tipo_activo: [ '', [Validators.required] ],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ActivosModalComponent>,
              private fb: FormBuilder,
              private activoService: ActivoService) { }

  ngOnInit(): void {
    console.log( this.data.activo )
    this.cargarFormulario();
  }

  cargarFormulario(){
    if(this.activo.uid){

      this.formActivo.controls['nombre'].setValue(this.activo.nombre);
      this.formActivo.controls['detalle'].setValue(this.activo.detalle);
      this.formActivo.controls['costo'].setValue(this.activo.costo);
      this.formActivo.controls['tipo_activo'].setValue(this.activo.tipo_activo._id);
      this.formActivo.controls['fecha'].setValue(this.activo.fecha);
    }
  }

  guardarActivo(){
    
    if( this.formActivo.invalid ){
      this.formActivo.markAllAsTouched();
      return;
    }

    this.activo.nombre = this.formActivo.controls['nombre'].value.trim().toUpperCase();
    this.activo.detalle = this.formActivo.controls['detalle'].value.trim().toUpperCase();
    this.activo.tipo_activo = this.formActivo.controls['tipo_activo'].value;
    this.activo.costo = this.formActivo.controls['costo'].value;
    this.activo.fecha = moment(this.formActivo.controls['fecha'].value).format('YYYY-MM-DD') ; 

    if( typeof this.activo.uid !== 'undefined' ){
      this.activoService.updateActivo(this.activo)
        .subscribe( resp => {
          if(resp.ok===true){
            this.dialogRef.close(true);
          }else{
            this.dialogRef.close(false);
          }
      });
    }else{
      this.activoService.postActivos(this.activo)
        .subscribe( resp => {
          if(resp.ok=== true){
            this.dialogRef.close(true);
          }else{
            this.dialogRef.close(false);
          }
        });
    }
  }

}
