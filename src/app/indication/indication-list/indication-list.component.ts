import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IndicationService } from '../../shared/indication.service';
import { MessageService } from '../../shared/message/message.service';
import { AuthService } from '../../shared/auth.service';
import { Indication } from 'src/app/model/indication.model';
import { Client } from 'src/app/model/client.model';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-indication-list',
  templateUrl: './indication-list.component.html',
  styleUrls: ['./indication-list.component.css']
})
export class IndicationListComponent implements OnInit {

  @ViewChild('searchForm', {static: true}) searchForm: NgForm;

  private indications: Indication[];
  private client: Client;

  constructor(
    private indicationService: IndicationService,
    private messageService: MessageService,
    private authService: AuthService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.indications = [];
    this.client = new Client();
    console.log('IndicationList constructor');
  }

  ngOnInit() {

    let clientId = this.authService.getTokenId();
    try {
      if (clientId) {
        this.client.codCliente = clientId;
        this.indicationService.getIndications(this.client.codCliente).subscribe(
          (indications: Indication[]) => {
            this.setIndications(indications);
          }
        );
      }
    } catch(err) {
      console.error('Unable to process token', err);
    }

  }

  isFormValid(): boolean {
    return this.searchForm.valid && 
      this.searchForm.value.inputBeginDate != null &&
      this.searchForm.value.inputEndDate != null;
  }

  getIndications() {
    return this.indications.slice();
  }

  setIndications(indications: Indication[]) {
    this.indications = indications;
  }

  onBtnClear() {
    this.indications.splice(0);
  }

  onBtnSearch() {

    if (this.client.codCliente) {

      let searchTerm: string = this.searchForm.value.inputSearch;
      
      // Define startDate
      let startDate: Date = (this.searchForm.value.inputBeginDate as Date);
      startDate.setSeconds(1);
      let startCreationAt: string = startDate.toISOString();

      // Define endDate
      let endDate: Date = (this.searchForm.value.inputEndDate as Date);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);
      let endCreationAt: string = endDate.toISOString();
  
      if (searchTerm != null && startCreationAt != null && endCreationAt != null) {
        
        this.indicationService.getIndications(this.client.codCliente, searchTerm, 
          startCreationAt, endCreationAt).subscribe(
          (indications: Indication[]) => {
            this.setIndications(indications);
          }
        );

      } else if (searchTerm != null) {

        this.indicationService.getIndications(this.client.codCliente, searchTerm).subscribe(
          (indications: Indication[]) => {
            this.setIndications(indications);
          }
        );

      } else if (startCreationAt != null && endCreationAt != null) {

        this.indicationService.getIndications(
            this.client.codCliente, 
            startCreationAt, 
            endCreationAt).subscribe(
          (indications: Indication[]) => {
            this.setIndications(indications);
          }
        );

      } else {
        this.messageService.showWarningMessage();
      }
      
    } else {
      this.messageService.showErrorMessage();
    }
    
  }

  onSubmit() {
    // Ok, nothing here
  }
  
  onSelectedRow(selectedIndication: Indication) {
    this.indicationService.notitySelectedIndication(selectedIndication);
    let urlEdit = `${selectedIndication.codIndication}/edit`;
    this.router.navigate([urlEdit], {relativeTo: this.activatedRoute});
  }
}
