import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: HomeComponent},
  // { path: 'login', component: LoginComponent},
  { path: 'login', loadChildren: './login/login.module#LoginModule'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
