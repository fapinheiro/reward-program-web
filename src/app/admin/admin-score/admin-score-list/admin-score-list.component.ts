import { Component, OnDestroy, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
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
import { AdminScoreFormComponent, AdminScoreFormModeEnum } from '../admin-score-form/admin-score-form.component';

@Component({
  selector: 'app-admin-score-list',
  templateUrl: './admin-score-list.component.html',
  styleUrls: ['./admin-score-list.component.css']
})
export class AdminScoreListComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {

  
  @ViewChild(AdminScoreFormComponent, {static: false}) 
  private scoreFormComponent: AdminScoreFormComponent;
  
  modeList: AdminScoreFormModeEnum = AdminScoreFormModeEnum.LIST;

  scoresList: Score[];

  constructor(
    // private indicationService: IndicationService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      console.log('AdminScoreList constructor');
  }
    
  ngOnInit() {
    let s1 = new Score();
    s1.codScore = 1;
    s1.goodType = "car";
    s1.iniCredit = 120000;
    s1.endCredit = 250000;
    s1.iniInst = 12;
    s1.endInst = 36;
    s1.score = 100;
    s1.creationAt = new Date().toUTCString();

    let s2 = new Score();
    s2.codScore = 2;
    s2.goodType = "bike";
    s2.iniCredit = 200000;
    s2.endCredit = 300000;
    s2.iniInst = 24;
    s2.endInst = 48;
    s2.score = 200;
    s2.creationAt = new Date().toUTCString();

    this.scoresList = [
      s1, s2
    ];

    // console.log(`InitForm: ${this.scoreFormComponent}`);
    // console.log(`FormValide: ${this.scoreFormComponent.scoreForm.valid}`);
    // this.scoreFormComponent.score = new Score();
    // this.scoreFormComponent.score.goodType = "";
    // this.setEditFormFields();
    // this.indicationSubscription = this.indicationService.indicationSelectedEvent.subscribe(
    //   indication => {
    //       this.selectedIndication = indication;
    //       this.setEditFormFields(indication.name, indication.email, indication.phone, false);
    // });
  }

  ngAfterContentInit() {
    // console.log(`ContentInitForm: ${this.scoreFormComponent}`);
  }

  ngAfterViewInit() {
    console.log(`ViewInitForm: ${this.scoreFormComponent}`);
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

  // isFormValid(): boolean {
  //   return this.scoreForm.valid && 
  //   this.scoreForm.value.inputBeginDate != null &&
  //   this.scoreForm.value.inputEndDate != null;
  // }

  getScores() {
    return this.scoresList.slice();
  }

  
  setScores(scoresList: Score[]) {
    this.scoresList = scoresList;
  }

  onBtnClear() {
    this.scoresList.splice(0);
  }

  btnSearch(form: NgForm) {
    console.log(`List btnSearch: ${form}`);
  }
  
  onBtnVoltar() {
    // this.router.navigate(["indications"]);
  }
  
  onSelectedRow(selectedScore: Score) {
    // this.scoreService.scoreSelectedEvent.next(selectedScore);
    let urlEdit = `${selectedScore.codScore}/edit`;
    this.router.navigate([urlEdit], {relativeTo: this.activatedRoute});
  }
}
