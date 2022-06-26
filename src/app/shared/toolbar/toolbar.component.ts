import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() sidenav: any; 
  
  constructor( private router: Router,
               private authService:AuthService) { }
  
  ngOnInit(): void {
  }

  salir(){
    this.router.navigateByUrl( '/auth' );
    this.authService.logout();
  }

  


}
