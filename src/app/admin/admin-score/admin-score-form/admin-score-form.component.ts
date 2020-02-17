import { Component, OnDestroy, OnInit, ViewChild, Input, AfterViewInit, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Options } from 'ng5-slider';
import * as jwt_decode from 'jwt-decode';

import { Indication } from '../../../model/indication.model';
import { IndicationService } from '../../../shared/indication.service';
import { MessageService } from '../../../shared/message/message.service';
import { Client } from '../../../model/client.model';
import { AuthService } from '../../../shared/auth.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Score } from 'src/app/model/score.model';

export enum AdminScoreFormModeEnum {
  LIST,
  NEW,
  EDIT
}

@Component({
  selector: 'app-admin-score-form',
  templateUrl: './admin-score-form.component.html',
  styleUrls: ['./admin-score-form.component.css']
})
export class AdminScoreFormComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {

  @Output() onBtnSearchClicked = new EventEmitter<NgForm>();
  @Output() onBtnNewClicked = new EventEmitter<NgForm>();
  @Output() onBtnClearClicked = new EventEmitter<NgForm>();
  @Output() onBtnBackClicked = new EventEmitter<NgForm>();
  @Output() onBtnUpdateClicked = new EventEmitter<NgForm>();
  
  @ViewChild('scoreForm', {static: true}) 
  private scoreForm: NgForm;

  @Input('formMode') 
  private adminScoreFormMode: AdminScoreFormModeEnum = AdminScoreFormModeEnum.LIST; // Default to LIST

  private score: Score;

  private creditMinValue: number = 100000;
  private creditMaxValue: number = 348000;
  private creditOptions: Options = {
    floor: 0,
    ceil: 500000,
    step: 1000,
    translate: (value: number): string => {
      return value + '€';
    }
  };

  private instMinValue: number = 24;
  private instMaxValue: number = 84;
  private instOptions: Options = {
    floor: 0,
    ceil: 120,
    step: 12,
    translate: (value: number): string => {
      if (value > 1)
        return value + ' months';
      return '1 month';
    }
  };

  constructor(
    // private indicationService: IndicationService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      console.log('AdminScoreForm constructor');
  }
    
  // public get scoreForm() : NgForm {
  //   return this._scoreForm;
  // }
  
  // public get mode(): string {
  //   return this._mode;
  // }

  ngOnInit() {
    // this.scoresList = [];
    this.score = new Score();
    this.score.goodType = "";
    console.log(`Mode: ${this.adminScoreFormMode}`);
    console.log(`FormValid: ${this.scoreForm.valid}`);
    // this.setEditFormFields();
    // this.indicationSubscription = this.indicationService.indicationSelectedEvent.subscribe(
    //   indication => {
    //       this.selectedIndication = indication;
    //       this.setEditFormFields(indication.name, indication.email, indication.phone, false);
    // });
  }

  ngAfterContentInit() {
    console.log(`ContentMode: ${this.adminScoreFormMode}`);
  }

  ngAfterViewInit() {
    console.log(`ViewMode: ${this.adminScoreFormMode}`);
  }

  ngOnDestroy() {
    // this.indicationSubscription.unsubscribe();
  }

  onSubmit() {
    // let authInfo = jwt_decode(this.authService.getToken());

    // if (authInfo.clientId) {
      
    //   // Set indication fields
    //   let client = new Client();
    //   client.codCliente = authInfo.clientId;
    //   this.selectedIndication.client = client;
    //   this.selectedIndication.name = this.inputName.value;
    //   this.selectedIndication.email = this.inputEmail.value;
    //   this.selectedIndication.phone = this.inputPhone.value;

    //   // Update indication
    //   this.indicationService
    //     .updateIndication(this.selectedIndication)
    //     .subscribe( _ => {
    //         this.messageService.showSuccessMessageToURL('/indications');
    //         this.editForm.reset();
    //       }
    //     );
    // } else {
    //   this.messageService.showErrorMessage();
    // }
    
  }

  isListMode(): boolean {
    return this.adminScoreFormMode == AdminScoreFormModeEnum.LIST;
  }

  get LIST(): number {
    return AdminScoreFormModeEnum.LIST;
  }

  get EDIT(): number {
    return AdminScoreFormModeEnum.EDIT;
  }

  get NEW(): number {
    return AdminScoreFormModeEnum.NEW;
  }

  isFormValid(): boolean {
    return this.scoreForm.valid && 
    this.scoreForm.value.inputBeginDate != null &&
    this.scoreForm.value.inputEndDate != null;
  }

  onBtnSearch() {
    console.log("Form btnSearch");
    this.onBtnSearchClicked.emit(this.scoreForm);
  }
  
  onBtnNew() {
    console.log("Form onBtnNew");
    this.onBtnNewClicked.emit(this.scoreForm);
  }
  
  onBtnClear() {
    console.log("Form onBtnClear");
    this.onBtnClearClicked.emit(this.scoreForm);
  }

  onBtnBack() {
    console.log("Form onBtnBack");
    // this.router.navigate(["indications"]);
    this.onBtnBackClicked.emit(this.scoreForm);
  }

  onBtnUpdate() {
    console.log("Form onBtnUpdate");
    this.onBtnUpdateClicked.emit(this.scoreForm);
  }
  
}

