import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alerta-borrado',
  templateUrl: './alerta-borrado.component.html',
  styleUrls: ['./alerta-borrado.component.css']
})
export class AlertaBorradoComponent implements OnInit {

  titulo: string = this.data.titulo || 'Borrar';

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private dialogRef: MatDialogRef<AlertaBorradoComponent> ) { }

  ngOnInit(): void {
  }

  eliminar(){
    this.dialogRef.close(true);
  }

  cancelar(){
    this.dialogRef.close(false);
  }

}
