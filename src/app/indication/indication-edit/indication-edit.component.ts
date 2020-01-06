import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as jwt_decode from 'jwt-decode';

import { Indication } from '../../model/indication.model';
import { IndicationService } from '../../shared/indication.service';
import { MessageService } from '../../shared/message/message.service';
import { Client } from '../../model/client.model';
import { AuthService } from '../../shared/auth.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-indication-edit',
  templateUrl: './indication-edit.component.html',
  styleUrls: ['./indication-edit.component.css']
})
export class IndicationEditComponent implements OnInit, OnDestroy{

  private indicationSubscription: Subscription;
  
  private selectedIndication: Indication;

  inputName = new FormControl('');
  inputEmail =  new FormControl('');
  inputPhone = new FormControl('');
  editForm = new FormGroup({});

  constructor(
    private indicationService: IndicationService,
    private messageService: MessageService,
    private authService: AuthService,
    private location: Location) {
    // Ok, nothing here
    console.log('edit');
  }

  ngOnInit() {
    this.generateEditForm();
    this.indicationSubscription = this.indicationService.indicationSelectedEvent.subscribe(
      indication => {
          this.selectedIndication = indication;
          this.generateEditForm(indication.name, indication.email, indication.phone, false);
    });
  }

  ngOnDestroy() {
    this.indicationSubscription.unsubscribe();
  }

  onSubmit() {
    let authInfo = jwt_decode(this.authService.getToken());
    if (authInfo.clientId) {
      let client = new Client();
      client.codCliente = authInfo.clientId;
      this.selectedIndication.client = client;
      console.log('indicationEdit', this.selectedIndication);
      this.indicationService
        .updateIndication(this.selectedIndication)
        .subscribe( _ => {
            this.messageService.showSuccessMessageToURL('/indications');
            this.editForm.reset();
          }
        );
    } else {
      this.messageService.showErrorMessage();
    }
    
  }

  isFormValid(): boolean {
    return this.editForm.valid;
  }

  private generateEditForm(name: string = '', email: string = '', phone: string = '', isCreation: boolean = true) {

    this.inputName.setValue(name);
    this.inputEmail.setValue(email);
    this.inputPhone.setValue(phone);

    if (isCreation) {
      console.log('setting');
      this.editForm.addControl('inputName', this.inputName);
      this.editForm.addControl('inputEmail', this.inputEmail);
      this.editForm.addControl('inputPhone', this.inputPhone);
    } else {
      console.log('updating');
      this.editForm.setControl('inputName', this.inputName);
      this.editForm.setControl('inputEmail', this.inputEmail);
      this.editForm.setControl('inputPhone', this.inputPhone);
    }

  }

  onBtnVoltar() {
    this.location.back();
  }
}
