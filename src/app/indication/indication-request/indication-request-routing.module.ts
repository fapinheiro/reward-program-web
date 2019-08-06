import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndicationRequestComponent } from './indication-request.component';

const appRoutes: Routes = [
  { path: '', component: IndicationRequestComponent}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class IndicationRequestRoutingModule {    
}