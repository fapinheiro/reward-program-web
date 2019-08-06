import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
 
@Component({
  selector: 'app-indication-request',
  templateUrl: './indication-request.component.html',
  styleUrls: ['./indication-request.component.css']
})
export class IndicationRequestComponent  {

  @ViewChild('indicationForm') indicationForm: NgForm;

  constructor() { 
    // Ok, nothing here
  }

  ngOnInit() {
  }

  onSubmit() {
  }

  isFormValid(): boolean {
    return this.indicationForm.valid;
  }
}
