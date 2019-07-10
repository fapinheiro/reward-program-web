import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  @ViewChild('registerForm') registerForm: NgForm;

  constructor() { 
    // Ok, nothing here
  }

  ngOnInit() {
    // Ok, nothing here 
  }

  onSubmit() {
  }

  isFormValid(): boolean {
    // console.log(this.loginForm.valid);
    return this.registerForm.valid;
  }
}
