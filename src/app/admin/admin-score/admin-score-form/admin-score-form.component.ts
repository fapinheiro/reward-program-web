import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-admin-score-form',
  templateUrl: './admin-score-form.component.html',
  styleUrls: ['./admin-score-form.component.css']
})
export class AdminScoreFormComponent implements OnInit, OnDestroy{

  @ViewChild('scoreForm', {static: true}) scoreForm: NgForm;

  score: Score;

  creditMinValue: number = 100000;
  creditMaxValue: number = 348000;
  creditOptions: Options = {
    floor: 0,
    ceil: 500000,
    step: 1000,
    translate: (value: number): string => {
      return value + '€';
    }
  };

  instMinValue: number = 24;
  instMaxValue: number = 84;
  instOptions: Options = {
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
      console.log('AdminScoreList constructor');
  }
    
  ngOnInit() {
    // this.scoresList = [];
    this.score = new Score();
    this.score.goodType = "";
    // this.setEditFormFields();
    // this.indicationSubscription = this.indicationService.indicationSelectedEvent.subscribe(
    //   indication => {
    //       this.selectedIndication = indication;
    //       this.setEditFormFields(indication.name, indication.email, indication.phone, false);
    // });
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

  isFormValid(): boolean {
    return this.scoreForm.valid && 
    this.scoreForm.value.inputBeginDate != null &&
    this.scoreForm.value.inputEndDate != null;
  }

  // getScores() {
  //   return this.scoresList.slice();
  // }

  
  // setScores(scoresList: Score[]) {
  //   this.scoresList = scoresList;
  // }

  // onBtnClear() {
  //   this.scoresList.splice(0);
  // }

  onBtnSearch() {
  }
  

  onBtnVoltar() {
    // this.router.navigate(["indications"]);
  }
  
  // onSelectedRow(selectedScore: Score) {
  //   // this.scoreService.scoreSelectedEvent.next(selectedScore);
  //   let urlEdit = `${selectedScore.codScore}/edit`;
  //   this.router.navigate([urlEdit], {relativeTo: this.activatedRoute});
  // }
}
