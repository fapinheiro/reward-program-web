import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: HomeComponent},
  // { path: 'login', component: LoginComponent},
  { path: 'login', loadChildren: './login/login.module#LoginModule'},
  { path: 'register', loadChildren: './register/register.module#RegisterModule'},
  { path: 'indications', loadChildren: './indication/indication.module#IndicationModule'},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: true
      // enableTracing: true // Only for debug purpouses
    }) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
