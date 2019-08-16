import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {ListComponent} from './list/list.component';


const routes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {path: 'search', component: SearchComponent},
  {path: 'list', component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
