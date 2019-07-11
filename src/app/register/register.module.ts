import { NgModule } from '@angular/core';

import { RegisterComponent } from './register.component';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule } from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterRoutingModule } from './register-routing.module';
import { PostalCodeService } from '../shared/postal-code.service';

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
        MatSelectModule
    ],
    providers: [
        PostalCodeService
    ],
})
export class RegisterModule {
}