import { Component, OnInit, ViewChild } from '@angular/core';

import { Score } from 'src/app/model/score.model';
import { AdminScoreFormComponent, AdminScoreFormModeEnum } from '../admin-score-form/admin-score-form.component';
import { ScoreService } from 'src/app/shared/score.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-score-list',
  templateUrl: './admin-score-list.component.html',
  styleUrls: ['./admin-score-list.component.css']
})
export class AdminScoreListComponent implements OnInit {

  
  @ViewChild(AdminScoreFormComponent, {static: false}) 
  private scoreFormComponent: AdminScoreFormComponent;
  
  modeList: AdminScoreFormModeEnum = AdminScoreFormModeEnum.LIST;

  scoresList: Score[] = [];

  constructor(
    private scoreService: ScoreService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      console.log('AdminScoreList constructor');
  }
    
  ngOnInit() {
    this.scoreService.getScores().subscribe(
          (scores: Score[]) => {
            console.log("Fetched scores");
            this.setScores(scores);
          }
    );
  }

  getScores() {
    return this.scoresList.slice();
  }
  
  setScores(scoresList: Score[]) {
    this.scoresList = scoresList;
  }
 
  onBtnSearch(score: Score) {
    console.log(`List btnSearch: ${score}`);
  }
  
  onSelectedRow(score: Score) {
    this.scoreService.notifySelectedScore(score);
    let urlEdit = `${score.codScore}/edit`;
    this.router.navigate([urlEdit], {relativeTo: this.activatedRoute});
  }

  onBtnNew(score: Score) {
    console.log(`btnNew: ${score}`);
    this.router.navigate(["new"], {relativeTo: this.activatedRoute});
  }
}
