import { Component } from '@angular/core';

import { IndicationService } from '../../shared/indication.service';
import { MessageService } from '../../shared/message/message.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-indication-view',
  templateUrl: './indication-view.component.html',
  styleUrls: ['./indication-view.component.css']
})
export class IndicationViewComponent {


  constructor(
    private indicationService: IndicationService,
    private messageService: MessageService,
    private authService: AuthService) {
    // Ok, nothing here
  }

  ngOnInit() {
  }

  

}
