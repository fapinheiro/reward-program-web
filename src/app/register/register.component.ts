import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
 
import { debounceTime, distinctUntilChanged, switchMap, filter} from 'rxjs/operators';

import { Client } from '../model/client.model';
import { PostalCode } from '../model/postal-code.model';
import { PostalCodeService } from '../shared/postal-code.service';
import { ClientService } from '../shared/client.service';
import { ActivatedRoute} from '@angular/router';

import { environment } from '../../environments/environment';

import { MessageService } from '../shared/message/message.service';
import { IndicationService } from '../shared/indication.service';
import { IndicationStatusEnum } from '../model/indication.model';
import { ListService } from '../shared/list.service';
import { Address } from '../model/address.model';
import { Contact } from '../model/contact.model';
import { Identification } from '../model/identification.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  
  @ViewChild('registerForm', {static: true}) registerForm: NgForm;
  
  contactPrefix: string = "+351";

  // PostalCode
  postalCodesList$: Observable<PostalCode[]>;
  searchTerms = new Subject<string>();
  postalCodeSelected: PostalCode;

  // Address
  inputAddressValue: string = "";
  inputDistrictValue: string;
  inputCountyValue: string;
  inputCodeValue: string;
  inputLocaleInfo: string;
  isAddressSet: boolean;

  // Identifications
  identTypeList$: Observable<string[]>;
  searchIdentTypes = new Subject<string>();
  identTypeSelected: string;
  inputIdentType: string;
  inputIdentInfo: string;

  // Client
  client: Client;
  inputPhone: string;

  constructor(
    private postalCodeService: PostalCodeService,
    private clientService: ClientService,
    private indicationService: IndicationService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private listService: ListService) { 
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

        // Set up fields
        this.client.email = indication.email;
        this.client.name = indication.name;

        // Create contact
        let contact = new Contact();
        contact.contactType = "CELLPHONE"
        contact.contact = this.contactPrefix + indication.phone;
        this.client.contacts = [];
        this.client.contacts.push(contact);

      });

    // Create asynch search pipe for postal code
    this.postalCodeSelected = new PostalCode();
    this.postalCodesList$ = this.searchTerms
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap((code: string) => 
          this.postalCodeService.getPostalCodesByCodeNumber(code)),
      );

    // Create async pipe for identType
    this.identTypeList$ = this.searchIdentTypes
      .pipe(
        switchMap( _ => 
          this.listService.getIdentificationType()),
    );

  }

  ngAfterViewInit() {
    this.searchIdentTypes.next();
  }

  ngOnDetroy() {
    this.searchTerms.unsubscribe();
    this.searchIdentTypes.unsubscribe();
  }

  onPostalCodeKeyUp(code: string) {
    this.searchTerms.next(code);
  }

  onPostalCodeSelected(selected: PostalCode) {
    this.postalCodeSelected = selected;
    this.isAddressSet = true;
    this.inputDistrictValue = selected.county.district.description;
    this.inputCountyValue = selected.county.description;
    this.inputCodeValue = selected.postalCode;
  }

  onIdentTypeSelected(identSelected: string) {
    this.identTypeSelected = identSelected;
  }

  onSubmit() {

    // Set up fields
    this.client.email = this.registerForm.value.inputEmail;
    this.client.password = this.registerForm.value.inputPassword;
    this.client.name = this.registerForm.value.inputName;
    let birthDate: Date = (this.registerForm.value.inputBirthDate as Date);
    this.client.birthDate = birthDate.toLocaleDateString(environment.locale);

    // Create contact
    let contact = new Contact();
    contact.contactType = "CELLPHONE"
    contact.contact = this.contactPrefix + this.registerForm.value.inputPhone;
    this.client.contacts = [];
    this.client.contacts.push(contact);

    // Create address
    this.client.address = new Address();
    this.client.address.postalCodeId = this.postalCodeSelected.postalCodeId;
    this.client.address.localeInfo = this.registerForm.value.inputLocaleInfo;

    // Create identifications
    let ident = new Identification();
    ident.identType = this.identTypeSelected;
    ident.identCode = this.registerForm.value.inputIdentInfo;
    let emissionDate: Date = (this.registerForm.value.inputEmissionDate as Date);
    ident.emissionDate = emissionDate.toLocaleDateString(environment.locale);
    let validDate: Date = (this.registerForm.value.inputValidDate as Date);
    ident.validDate = validDate.toLocaleDateString(environment.locale);
    this.client.identifications = [];
    this.client.identifications.push(ident);

    console.log(JSON.stringify(this.client));

    this.clientService.addClient(this.client)
    .subscribe( _ => {
        this.messageService.showSuccessMessageToURL('/');
    });
  }

  isFormValid(): boolean {
    return this.registerForm.valid && this.isAddressSet && 
      this.registerForm.value.inputEmissionDate != null && 
      this.registerForm.value.inputValidDate != null;
  }

  onBtnClear(): void {
    this.inputAddressValue = "";
  }

}
