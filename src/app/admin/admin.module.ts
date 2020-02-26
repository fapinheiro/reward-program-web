import { NgModule } from '@angular/core';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule } from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng5SliderModule } from 'ng5-slider';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminParametersComponent } from './admin-parameters/admin-parameters.component';
import { AdminScoreListComponent } from './admin-score/admin-score-list/admin-score-list.component';
import { AdminScoreFormComponent } from './admin-score/admin-score-form/admin-score-form.component';
import { AdminScoreEditComponent } from './admin-score/admin-score-edit/admin-score-edit.component';
import { AdminScoreRequestComponent } from './admin-score/admin-score-request/admin-score-request.component';

@NgModule({
    declarations: [
        AdminParametersComponent,
        AdminScoreFormComponent,
        AdminScoreListComponent,
        AdminScoreEditComponent,
        AdminScoreRequestComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSliderModule,
        Ng5SliderModule
    ],
    providers: [
        // PostalCodeService,
        // ClientService
    ],
})
export class AdminModule {
}