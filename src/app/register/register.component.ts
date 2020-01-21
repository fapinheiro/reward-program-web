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
import { IndicationService } from '../shared/indication.service';
import Indication, { IndicationStatusEnum } from '../model/indication.model';

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
  private client: Client;

  constructor(
    private postalCodeService: PostalCodeService,
    private clientService: ClientService,
    private indicationService: IndicationService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute) { 
    // Ok, nothing here
  }

  ngOnInit() {
    this.client = new Client();
    this.activatedRoute.queryParams
      .subscribe(
        (params: Params) => {
          // Process indication token
          if (params['indToken']) {
           const indToken = +params['indToken'];
            this.indicationService.getIndicationById(indToken)
              .subscribe( 
                (ind: Indication) => {
                this.client.email = ind.email;
                this.client.name = ind.name;
                this.client.phone = ind.phone;
            });
          }
      }
    );

    // Create asynch search pipe for postal code
    this.postalCodeSelected = new PostalCode();
    this.postalCodesList$ = this.searchTerms.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((code: string) => 
        this.postalCodeService.getPostalCodesByCodeNumber(code)),
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
    this.client.postalCode = this.postalCodeSelected;
    this.client.email = this.registerForm.value.inputEmail;
    this.client.name = this.registerForm.value.inputName;
    this.client.phone = this.registerForm.value.inputPhone;
    this.client.nif = this.registerForm.value.inputNIF;
    this.client.password = this.registerForm.value.inputPassword;
    this.clientService.addClient(this.client)
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
