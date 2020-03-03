import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MessageService } from '../../shared/message/message.service';
import { AuthService } from '../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParameterService } from 'src/app/shared/parameter.service';
import { Parameter } from 'src/app/model/parameter.model';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-parameters',
  templateUrl: './admin-parameters.component.html',
  styleUrls: ['./admin-parameters.component.css']
})
export class AdminParametersComponent implements OnInit, OnDestroy{

  private defaultIndicationExpiration: number = 30;
  private defaultScoreExpiration: number = 60;

  inputIndicationExpiration = new FormControl('');
  inputScoreExpiration = new FormControl('');
  inputUpdatedAt = new FormControl({value: '', disabled: true});
  inputCreatedAt = new FormControl({value: '', disabled: true});
  parametersForm = new FormGroup({});
  parameterSelected: Parameter;

  constructor(
    private parameterService: ParameterService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router) {
    // Ok, nothing here
    console.log('edit');
  }

  ngOnInit() {
    this.setEditFormFields(null, true);
    this.parameterService.getParameters().subscribe(
      (params: Parameter[]) => {
        if (params != null && params.length > 0) {
          this.parameterSelected = params[0];
          this.setEditFormFields(this.parameterSelected, true);
        }
      }
    );
  }

  ngOnDestroy() {
    // this.indicationSubscription.unsubscribe();
  }

  onSubmit() {

      // Set fields
      this.parameterSelected.indicationExpiration = this.inputIndicationExpiration.value;
      this.parameterSelected.scoreExpiration = this.inputScoreExpiration.value;

      // Update 
      this.parameterService
        .updateParameter(this.parameterSelected)
        .subscribe( param => {
            this.parameterSelected = param
            this.setEditFormFields(this.parameterSelected, false);
            this.messageService.showSuccessMessageToURL('/admin/parameters');
          }
        );
    
  }

  isFormValid(): boolean {
    return this.parametersForm.valid;
  }

  private setEditFormFields(param: Parameter, isCreation: boolean = true) {

    if (param == null) {
      this.inputIndicationExpiration.setValue(this.defaultIndicationExpiration);
      this.inputScoreExpiration.setValue(this.defaultScoreExpiration);
      this.inputCreatedAt.setValue('');
      this.inputUpdatedAt.setValue('');
    } else {
      this.inputIndicationExpiration.setValue(param.indicationExpiration);
      this.inputScoreExpiration.setValue(param.scoreExpiration);
      this.inputCreatedAt.setValue(param.creationAt);
      this.inputUpdatedAt.setValue(param.updatedAt);
    }

    if (isCreation) {
      this.parametersForm.addControl('inputIndicationExpiration', this.inputIndicationExpiration);
      this.parametersForm.addControl('inputScoreExpiration', this.inputScoreExpiration);
      this.parametersForm.addControl('inputCreatedAt', this.inputCreatedAt);
      this.parametersForm.addControl('inputUpdatedAt', this.inputUpdatedAt);
    } else {
      this.parametersForm.setControl('inputIndicationExpiration', this.inputIndicationExpiration);
      this.parametersForm.setControl('inputScoreExpiration', this.inputScoreExpiration);
      this.parametersForm.setControl('inputCreatedAt', this.inputCreatedAt);
      this.parametersForm.setControl('inputUpdatedAt', this.inputUpdatedAt);
    }

  }
 
  // onBtnReset() {
  //   if (this.parameterSelected != null) {
  //     this.setEditFormFields(this.parameterSelected, true);
  //   }
  // }

}
