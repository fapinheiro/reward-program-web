import { Component, OnDestroy, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';

import { MessageService } from '../../../shared/message/message.service';
import { AuthService } from '../../../shared/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Score } from 'src/app/model/score.model';
import { AdminScoreFormComponent, AdminScoreFormModeEnum } from '../admin-score-form/admin-score-form.component';
import { ScoreService } from 'src/app/shared/score.service';

@Component({
  selector: 'app-admin-score-edit',
  templateUrl: './admin-score-edit.component.html',
  styleUrls: ['./admin-score-edit.component.css']
})
export class AdminScoreEditComponent implements OnDestroy, AfterViewInit {

  private scoreSelectedSubscription: Subscription;

  @ViewChild(AdminScoreFormComponent, {static: false}) 
  private scoreFormComponent: AdminScoreFormComponent;
  
  modeEdit: AdminScoreFormModeEnum = AdminScoreFormModeEnum.EDIT;

  selectedScore: Score;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private scoreService: ScoreService,
    private activatedRoute: ActivatedRoute) {
      console.log('AdminScoreEdit constructor');
  }

  ngAfterViewInit() {
    console.log(`ViewInitForm: ${this.scoreFormComponent}`);
    setTimeout(() => {
      this.scoreSelectedSubscription = this.scoreService
        .getScoreSelectedEvent()
        .subscribe(
          score => {
            console.log(score);
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

  onBtnBack(score: Score) {
    console.log(`btnBack(): ${score}`)
    this.router.navigate(["admin/scores"]);
  }
  
  onBtnUpdate(newScore: Score) {
    console.log(`btnUpdate(): ${newScore}`)
    newScore.codScore = this.selectedScore.codScore;
    this.scoreService.updateScore(newScore).subscribe( 
      updatedScore => {
        this.scoreFormComponent.setFormValues(updatedScore);
        this.messageService.showSuccessMessage();
      }
    )
  }

}
