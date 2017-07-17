import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "app/login/login.component";
import { UserComponent } from "app/user/user.component";
import { DashboardComponent } from "app/dashboard/dashboard.component";
import { CardsComponent } from "app/cards/cards.component";

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/dashboard', component: DashboardComponent },
  { path: 'user/cards', component: CardsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
