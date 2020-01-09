import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndicationRequestComponent } from './indication-request/indication-request.component';
import { IndicationListComponent } from './indication-list/indication-list.component';
import { IndicationEditComponent } from './indication-edit/indication-edit.component';

const appRoutes: Routes = [
  { path: '', component: IndicationListComponent},
  { path: 'new', component: IndicationRequestComponent},
  { path: ':id/edit', component: IndicationEditComponent},
  // { path: 'new', component: IndicationRequestComponent}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class IndicationRoutingModule {    
}