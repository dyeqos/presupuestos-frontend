import { Component, OnInit } from '@angular/core';

import { ActivoService } from '../../services/activo.service';

import { Activo } from '../../interfaces/activos.interfaces';

@Component({
  selector: 'app-mis-activos',
  templateUrl: './mis-activos.component.html',
  styleUrls: ['./mis-activos.component.css']
})
export class MisActivosComponent implements OnInit {

  activosList!: Activo[];

  constructor( private actService : ActivoService) { }

  ngOnInit(): void {
    this.getActivos();
  }

  getActivos(){
    this.actService.getActivos()
      .subscribe( resp => {
        if(resp.ok===true){
          this.activosList = resp.data!;
        }else{
          this.activosList = [];
        }
      })
  }

  vender(uid: string){
    //por implementar
  }
  
  siniestro(uid: string){
    //por implementar
  }

}
