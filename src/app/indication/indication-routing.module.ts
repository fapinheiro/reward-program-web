import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndicationRequestComponent } from './indication-request/indication-request.component';
import { IndicationViewComponent } from './indication-view/indication-view.component';

const appRoutes: Routes = [
  { path: '', component: IndicationViewComponent},
  { path: 'new', component: IndicationRequestComponent}
  // { path: '', component: IndicationViewComponent},
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