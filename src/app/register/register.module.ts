import { NgModule } from '@angular/core';

import { RegisterComponent } from './register.component';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatNativeDateModule, MatDatepickerModule, MAT_DATE_LOCALE } from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterRoutingModule } from './register-routing.module';
import { PostalCodeService } from '../shared/postal-code.service';
import { ClientService } from '../shared/client.service';

import { environment } from '../../environments/environment';

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RegisterRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDatepickerModule
    ],
    providers: [
        PostalCodeService,
        ClientService,
        { provide: MAT_DATE_LOCALE, useValue: environment.locale},
    ],
})
export class RegisterModule {
}