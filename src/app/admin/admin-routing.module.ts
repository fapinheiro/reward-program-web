import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminParametersComponent } from './admin-parameters/admin-parameters.component';
import { AdminScoreListComponent } from './admin-score/admin-score-list/admin-score-list.component';
import { AdminScoreEditComponent } from './admin-score/admin-score-edit/admin-score-edit.component';
import { AdminScoreRequestComponent } from './admin-score/admin-score-request/admin-score-request.component';

const appRoutes: Routes = [
  { path: 'parameters', component: AdminParametersComponent},
  { path: 'scores', component: AdminScoreListComponent},
  { path: 'scores/new', component: AdminScoreRequestComponent},
  { path: 'scores/:id/edit', component: AdminScoreEditComponent}

  // Would be needed if you need/want to show components inside the same view
  // Will also need to include  <router-outlet></router-outlet> in the RecipesComponent so that Angular may render
  // { path: 'recipes', component: RecipesComponent, children: [
  //   { path: '', component: RecipeStartComponent },
  //   { path: 'new', component: RecipeEditComponent },
  //   { path: ':id', component: RecipeDetailComponent },
  //   { path: ':id/edit', component: RecipeEditComponent },
  // ] },
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