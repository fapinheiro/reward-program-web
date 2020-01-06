import { NgModule } from '@angular/core';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndicationRoutingModule } from './indication-routing.module';
import { IndicationRequestComponent } from './indication-request/indication-request.component';
import { IndicationListComponent } from './indication-list/indication-list.component';
import { IndicationEditComponent } from './indication-edit/indication-edit.component';

@NgModule({
    declarations: [
        IndicationListComponent,
        IndicationRequestComponent,
        IndicationEditComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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