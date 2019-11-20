import { NgModule } from '@angular/core';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule } from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndicationRoutingModule } from './indication-routing.module';
import { IndicationRequestComponent } from './indication-request/indication-request.component';
import { IndicationViewComponent } from './indication-view/indication-view.component';

@NgModule({
    declarations: [
        IndicationViewComponent,
        IndicationRequestComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IndicationRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule
    ],
    providers: [
        // PostalCodeService,
        // ClientService
    ],
})
export class IndicationModule {
}