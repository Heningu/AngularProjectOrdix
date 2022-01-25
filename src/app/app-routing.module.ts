import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from "./list/list.component";
import { HomeComponent } from "./home/home.component";
import { ListDetailsComponent } from "./list-details/list-details.component";

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'nr/:prj_nr', component: ListDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
