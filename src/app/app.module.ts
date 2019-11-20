import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

// Disable Materials animations
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';

// Active Materials animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Application Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

// Application Services
import { AuthService } from './shared/auth.service';

// Application Interceptors
import { AuthInterceptor } from './shared/auth.interceptor';
import { MessageService } from './shared/message/message.service';
import { MatDialogModule } from '@angular/material';
import { MessageDialogComponent } from './shared/message/message-dialog/message-dialog.component';
import { IndicationService } from './shared/indication.service';

@NgModule({

  // Components, Pipes, Directives, ...
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MessageDialogComponent,
  ],

  // Modules and Routing
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],

  // Components loaded dinamically
  entryComponents: [
    MessageDialogComponent
  ],

  // Services, Interceptors, Guards, to be used application-wide
  providers: [
    AuthService,
    MessageService,
    IndicationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
