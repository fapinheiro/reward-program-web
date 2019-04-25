import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { 
    
}
