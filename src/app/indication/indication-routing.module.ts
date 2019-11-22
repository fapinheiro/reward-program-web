import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndicationRequestComponent } from './indication-request/indication-request.component';
import { IndicationListComponent } from './indication-list/indication-list.component';

const appRoutes: Routes = [
  { path: '', component: IndicationListComponent},
  { path: 'new', component: IndicationRequestComponent}
  // { path: '', component: IndicationlistComponent},
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