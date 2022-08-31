import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor( public loaderService: LoaderService,
               private cdRef:ChangeDetectorRef ) { }
  
  ngOnInit(): void {
    this.cdRef.detectChanges();
  }

}
