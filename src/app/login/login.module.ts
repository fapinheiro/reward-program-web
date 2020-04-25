import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';

import { MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule } from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LoginRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule
    ]
})
export class LoginModule {
}