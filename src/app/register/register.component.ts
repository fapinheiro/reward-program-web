import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
 
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Client } from '../model/client.model';
import { PostalCode } from '../model/postal-code.model';
import { PostalCodeService } from '../shared/postal-code.service';
import { ClientService } from '../shared/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from '../shared/message/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  @ViewChild('registerForm', {static: true}) registerForm: NgForm;
  
  private postalCodesList$: Observable<PostalCode[]>;
  private searchTerms = new Subject<string>();
  private postalCodeSelected: PostalCode;
  private indicationToken: string;

  constructor(
    private postalCodeService: PostalCodeService,
    private clientService: ClientService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute) { 
    // Ok, nothing here
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.indicationToken = params['indToken'];
        console.log('IndicationToken', this.indicationToken);
      }
    );
    this.postalCodeSelected = new PostalCode();
    this.postalCodesList$ = this.searchTerms.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((code: string) => this.postalCodeService.getPostalCodesByCodeNumber(code)),
    );
  }

  ngOnDetroy() {
    this.searchTerms.unsubscribe();
  }

  onPostalCodeKeyUp(code: string) {
    this.searchTerms.next(code);
  }

  onPostalCodeSelected(selected: PostalCode) {
    this.postalCodeSelected = selected;
  }

  onSubmit() {
    const client = new Client();
    client.postalCode = this.postalCodeSelected;
    client.email = this.registerForm.value.inputEmail;
    client.name = this.registerForm.value.inputName;
    client.phone = this.registerForm.value.inputPhone;
    client.nif = this.registerForm.value.inputNIF;
    client.password = this.registerForm.value.inputPassword;
    this.clientService.addClient(client)
    .subscribe(
      _ => {
        this.messageService.showSuccessMessageToURL('/');
      }
    );
  }

  isFormValid(): boolean {
    // console.log(this.loginForm.valid);
    return this.registerForm.valid;
  }
}
