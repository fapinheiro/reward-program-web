import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IndicationService } from '../../shared/indication.service';
import { MessageService } from '../../shared/message/message.service';
import { AuthService } from '../../shared/auth.service';
import { Indication } from 'src/app/model/indication.model';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-indication-list',
  templateUrl: './indication-list.component.html',
  styleUrls: ['./indication-list.component.css']
})
export class IndicationListComponent {

  @ViewChild('searchForm', {static: true}) searchForm: NgForm;

  private indications: Indication[] = [];

  constructor(
    private indicationService: IndicationService,
    private messageService: MessageService,
    private authService: AuthService) {
    // Ok, nothing here
  }

  ngOnInit() {
  }

  isFormValid(): boolean {
    return this.searchForm.valid && 
      this.searchForm.value.inputBeginDate != null &&
      this.searchForm.value.inputEndDate != null;
  }

  getIndications() {
    return this.indications.slice();
  }

  setUsers(indications: Indication[]) {
    this.indications = indications;
  }

  onBtnClear() {
    this.indications.splice(0);
  }
}
