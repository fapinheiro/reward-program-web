import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminParametersComponent } from './admin-parameters/admin-parameters.component';

const appRoutes: Routes = [
  { path: 'parameters', component: AdminParametersComponent}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {    
}