import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminParametersComponent } from './admin-parameters/admin-parameters.component';
import { AdminScoreListComponent } from './admin-score/admin-score-list/admin-score-list.component';

const appRoutes: Routes = [
  { path: 'parameters', component: AdminParametersComponent},
  { path: 'scores', component: AdminScoreListComponent}
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