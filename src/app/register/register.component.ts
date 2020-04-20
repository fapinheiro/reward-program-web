import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
 
import { debounceTime, distinctUntilChanged, switchMap, filter, map} from 'rxjs/operators';

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
  private isAddressSet: boolean;
  private client: Client;
  
  postalCodeSelected: PostalCode;

  inputAddressValue: string = "";
  inputDistrictValue: string;
  inputCountyValue: string;
  inputCodeValue: string;

  constructor(
    private postalCodeService: PostalCodeService,
    private clientService: ClientService,
    private indicationService: IndicationService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute) { 
    console.log('Register constructor');
  }

  ngOnInit() {
    this.client = new Client();
    this.activatedRoute.queryParams
      .pipe(
        filter( params => params['indToken'] != null),
        switchMap( params => {
          const indToken = +params['indToken'];
          return this.indicationService.getIndicationById(indToken);
        })
      )
      .pipe(
        filter( indication => 
            indication.status == IndicationStatusEnum.CREATED || 
            indication.status == IndicationStatusEnum.SENT || 
            indication.status == IndicationStatusEnum.RESENT)
      )
      .subscribe( indication => {
        this.client.email = indication.email;
        this.client.name = indication.name;
        this.client.phone = indication.phone;
      });

    // this.activatedRoute.queryParams
    //   .subscribe(
    //     (params: Params) => {
    //       // Process indication token
    //       if (params['indToken']) {
    //        const indToken = +params['indToken'];
    //         this.indicationService.getIndicationById(indToken)
    //           .subscribe( 
    //             (ind: Indication) => {
                  
    //               // Check indication status
    //               if (ind.status == IndicationStatusEnum.CREATED || 
    //                   ind.status == IndicationStatusEnum.SENT || 
    //                   ind.status == IndicationStatusEnum.RESENT) {
    //                   this.client.email = ind.email;
    //                   this.client.name = ind.name;
    //                   this.client.phone = ind.phone;
    //               }
                  
    //         });
    //       }
    //   }
    // );

    // Create asynch search pipe for postal code
    this.postalCodeSelected = new PostalCode();
    this.postalCodesList$ = this.searchTerms
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap((code: string) => 
          this.postalCodeService.getPostalCodesByCodeNumber(code)),
      );
    console.log(this.inputAddressValue);
  }

  ngOnDetroy() {
    this.searchTerms.unsubscribe();
  }

  onPostalCodeKeyUp(code: string) {
    this.searchTerms.next(code);
  }

  onPostalCodeSelected(selected: PostalCode) {
    this.postalCodeSelected = selected;
    this.isAddressSet = true;
    this.inputDistrictValue = selected.concelho.distrito.nomeDistrito;
    this.inputCountyValue = selected.concelho.nomeConcelho;
    this.inputCodeValue = selected.codigoPostal;
    // this.inputAddressValue = selected.localidade;
  }

  onSubmit() {
    this.client.postalCode = this.postalCodeSelected;
    this.client.email = this.registerForm.value.inputEmail;
    this.client.name = this.registerForm.value.inputName;
    this.client.phone = this.registerForm.value.inputPhone;
    this.client.nif = this.registerForm.value.inputNIF;
    this.client.password = this.registerForm.value.inputPassword;
    this.clientService.addClient(this.client)
    .subscribe( _ => {
        this.messageService.showSuccessMessageToURL('/');
    });
  }

  isFormValid(): boolean {
    // console.log(this.registerForm.value.inputAddress);
    return this.registerForm.valid && this.isAddressSet;
  }

  onBtnClear(): void {
    this.inputAddressValue = "";
  }
}
