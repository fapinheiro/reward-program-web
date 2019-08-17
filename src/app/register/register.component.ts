import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
 
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Client } from '../model/client.model';
import { PostalCode } from '../model/postal-code.model';
import { PostalCodeService } from '../shared/postal-code.service';
import { ClientService } from '../shared/client.service';
import { Router } from '@angular/router';
import { MessageService } from '../shared/message/message.service';

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

  constructor(
    private postalCodeService: PostalCodeService,
    private clientService: ClientService,
    private messageService: MessageService) { 
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
    client.postalCode = this.postalCodeSelected;
    client.email = this.registerForm.value.inputEmail;
    client.name = this.registerForm.value.inputName;
    client.nif = this.registerForm.value.inputNIF;
    client.password = this.registerForm.value.inputPassword;
    this.clientService.addClient(client).subscribe(
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
