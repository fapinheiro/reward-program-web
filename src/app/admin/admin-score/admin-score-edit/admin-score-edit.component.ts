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
import { ScoreService } from 'src/app/shared/score.service';

@Component({
  selector: 'app-admin-score-edit',
  templateUrl: './admin-score-edit.component.html',
  styleUrls: ['./admin-score-edit.component.css']
})
export class AdminScoreEditComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {

  private scoreSelectedSubscription: Subscription;

  @ViewChild(AdminScoreFormComponent, {static: false}) 
  private scoreFormComponent: AdminScoreFormComponent;
  
  modeEdit: AdminScoreFormModeEnum = AdminScoreFormModeEnum.EDIT;

  selectedScore: Score;

  constructor(
    // private indicationService: IndicationService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private scoreService: ScoreService,
    private activatedRoute: ActivatedRoute) {
      console.log('AdminScoreEdit constructor');
  }
    
  ngOnInit() {
    
    // console.log(`InitForm: ${this.scoreFormComponent}`);
    // console.log(`FormValide: ${this.scoreFormComponent.scoreForm.valid}`);
    // this.scoreFormComponent.score = new Score();
    // this.scoreFormComponent.score.goodType = "";
    // this.setEditFormFields();
    
  }

  ngAfterContentInit() {
    // console.log(`ContentInitForm: ${this.scoreFormComponent}`);
  }

  ngAfterViewInit() {
    console.log(`ViewInitForm: ${this.scoreFormComponent}`);
    // this.scoreFormComponent.setCreditMinValue(120000);
    setTimeout(() => {
      this.scoreSelectedSubscription = this.scoreService
        .getScoreSelectedEvent()
        .subscribe(
          score => {
            this.selectedScore = score;
            this.scoreFormComponent.setFormValues(this.selectedScore);
          }
        );
    });
    
  }

  ngOnDestroy() {
    if (this.scoreSelectedSubscription != null) {
      this.scoreSelectedSubscription.unsubscribe();
    }
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


  onBtnClear() {
    // this.scoresEdit.splice(0);
  }

  // btnSearch(form: NgForm) {
  //   console.log(`List btnSearch: ${form}`);
  // }
  
  onBtnBack(form: FormGroup) {
    console.log(`btnBack(): ${form}`)
    this.router.navigate(["admin/scores"]);
  }
  
  onBtnUpdate(form: FormGroup) {
    console.log(`btnUpdate(): ${form}`)
  }

  // onSelectedRow(selectedScore: Score) {
  //   // this.scoreService.scoreSelectedEvent.next(selectedScore);
  //   let urlEdit = `${selectedScore.codScore}/edit`;
  //   this.router.navigate([urlEdit], {relativeTo: this.activatedRoute});
  // }


}
