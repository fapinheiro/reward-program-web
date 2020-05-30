import { Component, OnDestroy, OnInit, Input, AfterViewInit, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Options } from 'ng5-slider';

import { Score } from 'src/app/model/score.model';
import { ScoreService } from 'src/app/shared/score.service';
import { MessageService } from 'src/app/shared/message/message.service';

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

  @Output() onBtnSearchClicked = new EventEmitter<Score>();
  @Output() onBtnNewClicked = new EventEmitter<Score>();
  @Output() onBtnClearClicked = new EventEmitter<Score>();
  @Output() onBtnBackClicked = new EventEmitter<Score>();
  @Output() onBtnUpdateClicked = new EventEmitter<Score>();
  @Output() onBtnSaveClicked = new EventEmitter<Score>();
  
  inputGoodType = new FormControl('');
  inputScore = new FormControl('');
  inputBeginDate = new FormControl('');
  inputEndDate = new FormControl('');
  inputUpdatedAt = new FormControl({value: '', disabled: true});
  inputCreatedAt = new FormControl({value: '', disabled: true});

  scoreForm = new FormGroup({});

  @Input('formMode') 
  adminScoreFormMode: AdminScoreFormModeEnum = AdminScoreFormModeEnum.LIST; // Default to LIST

  // private score: Score;

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
    private scoreService: ScoreService,
    private messageService: MessageService,
    // private authService: AuthService,
    // private router: Router,
    // private activatedRoute: ActivatedRoute
    ) {
      // console.log('AdminScoreForm constructor');
  }
    
  setFormValues(selectedScore: Score) {

    if (selectedScore == null) {

      // Default values
      this.inputGoodType.setValue("");
      this.inputScore.setValue(1);

    } else {

      // Set values
      this.inputGoodType.setValue(selectedScore.goodType);
      this.inputScore.setValue(selectedScore.score);

      // Set non-managed values
      if (selectedScore.creditMin != null && selectedScore.creditMax != null) {
        this.creditMinValue = selectedScore.creditMin;
        this.creditMaxValue = selectedScore.creditMax;
        this.instMinValue = selectedScore.instMin;
        this.instMaxValue = selectedScore.instMax;
      }

      // Set dates
      if (this.isEditMode()) {
        this.inputCreatedAt.setValue(selectedScore.creationAt);
        this.inputUpdatedAt.setValue(selectedScore.updatedAt);
      }

    } 

    // Alter form values
    if (this.adminScoreFormMode == AdminScoreFormModeEnum.EDIT) {
      this.scoreForm.addControl('inputGoodType', this.inputGoodType);
      this.scoreForm.addControl('inputScore', this.inputScore);
      this.scoreForm.addControl('inputCreatedAt', this.inputCreatedAt);
      this.scoreForm.addControl('inputUpdatedAt', this.inputUpdatedAt);
    } else {
      this.scoreForm.setControl('inputGoodType', this.inputGoodType);
      this.scoreForm.setControl('inputScore', this.inputScore);
    }

  }

  ngOnInit() {
    console.log(`Mode: ${this.adminScoreFormMode}`);
    console.log(`FormValid: ${this.scoreForm.valid}`);
    this.setFormValues(null);
  }

  ngAfterContentInit() {
    console.log(`ContentMode: ${this.adminScoreFormMode}`);
  }

  ngAfterViewInit() {
    console.log(`ViewMode: ${this.adminScoreFormMode}`);
  }

  ngOnDestroy() {
    // Ok, nothing here
  }

  onSubmit() {
    // Ok, nothing here
  }

  isListMode(): boolean {
    return this.adminScoreFormMode == AdminScoreFormModeEnum.LIST;
  }

  isEditMode(): boolean {
    return this.adminScoreFormMode == AdminScoreFormModeEnum.EDIT;
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
    return this.scoreForm.valid;
  }

  onBtnSearch() {
    // console.log("Form btnSearch");
    let score = this.createScore();
    score.startCreationAt = this.inputBeginDate.value;
    score.endCreationAt = this.inputEndDate.value;
    this.onBtnSearchClicked.emit(score);
  }
  
  onBtnNew() {
    // console.log("Form onBtnNew");
    this.onBtnNewClicked.emit(this.createScore());
  }
  
  onBtnClear() {
    // console.log("Form onBtnClear");
    this.onBtnClearClicked.emit(this.createScore());
  }

  onBtnBack() {
    // console.log("Form onBtnBack");
    // this.router.navigate(["indications"]);
    this.onBtnBackClicked.emit(this.createScore());
  }

  onBtnUpdate() {
    // console.log("Form onBtnUpdate");
    this.onBtnUpdateClicked.emit(this.createScore());
  }
  
  onBtnSave() {
    // console.log("Form onBtnSave");
    let score: Score = this.createScore();
    this.scoreService.addScore(score)
      .subscribe( scoreNew => {
      this.onBtnSaveClicked.emit(scoreNew);
    });
  }

  private createScore(): Score {
    let score: Score = new Score();
    score.goodType = this.inputGoodType.value;
    score.creditMin = this.creditMinValue;
    score.creditMax = this.creditMaxValue;
    score.instMin = this.instMinValue;
    score.instMax = this.instMaxValue;
    score.score = this.inputScore.value;
    return score;
  }

}

