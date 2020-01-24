import { NgModule } from '@angular/core';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminParametersComponent } from './admin-parameters/admin-parameters.component';

@NgModule({
    declarations: [
        AdminParametersComponent
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
    ],
    providers: [
        // PostalCodeService,
        // ClientService
    ],
})
export class AdminModule {
}