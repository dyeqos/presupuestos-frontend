import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaBorradoComponent } from 'src/app/components/alerta-borrado/alerta-borrado.component';
import { Parametro } from 'src/app/interfaces/parametros.interfaces';
import { ParametrosService } from 'src/app/services/parametros.service';
import { Activo } from '../../interfaces/activos.interfaces';
import { ActivoService } from '../../services/activo.service';
import { ActivosModalComponent } from '../activos-modal/activos-modal.component';
import { CompraModalComponent } from '../../../compras/pages/compra-modal/compra-modal.component';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css']
})
export class ActivosComponent implements OnInit {

  activosList!: Activo[];
  tiposActivos!: Parametro[];

  constructor( private activoService: ActivoService, 
               private _snackBar: MatSnackBar,
               public dialog: MatDialog,
               private parametrosService:ParametrosService ) { }

  ngOnInit(): void {
    this.getActivos();
    this.getTiposActivos();
  }

  getTiposActivos(){
    this.parametrosService.getTiposActivos()
      .subscribe(resp => {
        if(resp.ok === true){
          this.tiposActivos= resp.data!;
        }
        else{
          this.tiposActivos= [];
        }
      })
  }

  drop(event: CdkDragDrop<string[]>) {
    if( this.activosList.length > 1 && event.previousIndex != event.currentIndex ){
      moveItemInArray( this.activosList, event.previousIndex, event.currentIndex );
      this.activosList.forEach((activo,index) =>{
        activo.posicion = index + 1;
      });
      this.activoService.updateActivos(this.activosList)
        .subscribe(resp => {
          if(resp.ok !== true) {
            this.abrirSnackBar("No se pudo Actualizar")
          }
        })
    }
  }

  getActivos(){
    this.activoService.getCotizaciones()
      .subscribe( resp => {
        if(resp.ok===true){
          this.activosList=resp.data!;
        }
      })
  }

  editar(uid:string){
    this.activoService.getActivo(uid)
      .subscribe( resp => {
        if(resp.ok === true) {

          this.dialog.open( ActivosModalComponent, {
            width: "500px",
            disableClose: true,
            data: {
              tiposActivos : this.tiposActivos,
              activo: resp.data! 
            }
          }).afterClosed().subscribe( resp => {
            if(resp === true){
              this.getActivos();
              this.abrirSnackBar("Modificación Exitosa");
            }else{
              this.abrirSnackBar("Error al Modificar");
            }
          });
        }
      });
  }

  comprar(uid:string){
    const nombreActivo = this.activosList.find( x => x.uid == uid)?.nombre;
    const uidActivo = uid;
    const modalCompra = this.dialog.open( CompraModalComponent, {
      width: "500px",
      disableClose: true,
      data: {
        nombreActivo,
        uidActivo
      }
    })
    modalCompra.afterClosed().subscribe( resp => {
      if(resp===true){
        this.getActivos();
        this.abrirSnackBar("Compra Exitosa");
      }
    })
  }
  
  eliminar(uid:string){
    const alertBorrado = this.dialog.open( AlertaBorradoComponent,{
      width: "250px",
      disableClose: true,
      data: { titulo:'Borrar Cotización de Activo' }
    } );

    alertBorrado.afterClosed()
      .subscribe( resp => {
        if( resp === true ){
          this.activoService.deleteActivo(uid)
            .subscribe(resp => {
              if( resp.ok === true ){
                this.getActivos();
                this.abrirSnackBar("Eliminación Exitosa");
              }
            });
        }
      });
  }

  abrirModal(){
    const modalActivo = this.dialog.open( ActivosModalComponent, {
        width: "500px",
        disableClose: true,
        data: {
          tiposActivos : this.tiposActivos
        }
     });
    modalActivo.afterClosed().subscribe( resp => {
    if(resp === true){
      this.getActivos();
      this.abrirSnackBar("Registro Exitoso");
    }else{
      this.abrirSnackBar("Error al Registrar");
    }
  })
  }

  abrirSnackBar(msg: String){
    this._snackBar.open(msg.toString(),'Aceptar',{
      horizontalPosition : 'end',
      verticalPosition: 'top',
      duration: 1500
    })
  }

}
