import { NgModule } from '@angular/core';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndicationRoutingModule } from './indication-routing.module';
import { IndicationRequestComponent } from './indication-request/indication-request.component';
import { IndicationListComponent } from './indication-list/indication-list.component';

@NgModule({
    declarations: [
        IndicationListComponent,
        IndicationRequestComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IndicationRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDatepickerModule,
    ],
    providers: [
        // PostalCodeService,
        // ClientService
    ],
})
export class IndicationModule {
}