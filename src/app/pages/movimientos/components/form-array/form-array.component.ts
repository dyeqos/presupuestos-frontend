import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

  @Input() inputFormGroup = this.fb.group({});
  
  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

}
