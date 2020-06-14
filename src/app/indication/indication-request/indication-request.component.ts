import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Indication } from '../../model/indication.model';
import { IndicationService } from '../../shared/indication.service';
import { MessageService } from '../../shared/message/message.service';
import { Client } from '../../model/client.model';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-indication-request',
  templateUrl: './indication-request.component.html',
  styleUrls: ['./indication-request.component.css']
})
export class IndicationRequestComponent {

  @ViewChild('indicationForm', {static: true}) indicationForm: NgForm;

  contactPrefix: string = "+351";
  
  constructor(
    private indicationService: IndicationService,
    private messageService: MessageService,
    private authService: AuthService) {
    // Ok, nothing here
  }

  ngOnInit() {
  }

  onSubmit() {
    let clientId = this.authService.getTokenId();
    if (clientId) {
      const indication = new Indication();
      const client = new Client();
      client.clientId = clientId;
      indication.client = client;
      indication.name = this.indicationForm.value.inputName;
      indication.email = this.indicationForm.value.inputEmail;
      indication.phone = this.indicationForm.value.inputPhone;
      this.indicationService.addIndication(indication)
        .subscribe(
          _ => {
            this.messageService.showSuccessMessageToURL('/indications');
            this.indicationForm.resetForm();
          }
        );
    } else {
      this.messageService.showErrorMessage();
    }
    
  }

  isFormValid(): boolean {
    return this.indicationForm.valid;
  }

}
