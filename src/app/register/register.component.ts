import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
 
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Client } from '../model/client.model';
import { PostalCode } from '../model/postal-code.model';
import { PostalCodeService } from '../shared/postal-code.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  @ViewChild('registerForm') registerForm: NgForm;
  postalCodesList$: Observable<PostalCode[]>;
  private searchTerms = new Subject<string>();
  private postalCodeSelected: PostalCode;

  constructor(private postalCodeService: PostalCodeService) { 
    // Ok, nothing here
  }

  ngOnInit() {
    this.postalCodeSelected = new PostalCode();
    this.postalCodesList$ = this.searchTerms.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((code: string) => this.postalCodeService.getPostalCodesByCodeNumber(code)),
    );
  }

  onPostalCodeKeyUp(code: string) {
    this.searchTerms.next(code);
  }

  onPostalCodeSelected(selected: PostalCode) {
    this.postalCodeSelected = selected;
  }

  onSubmit() {
    const client = new Client();
  }

  isFormValid(): boolean {
    // console.log(this.loginForm.valid);
    return this.registerForm.valid;
  }
}
