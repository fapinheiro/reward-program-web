import { NgModule } from '@angular/core';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule } from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndicationRequestRoutingModule } from './indication-request-routing.module';
import { IndicationRequestComponent } from './indication-request.component';

@NgModule({
    declarations: [
        IndicationRequestComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IndicationRequestRoutingModule,
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
export class IndicationRequestModule {
}