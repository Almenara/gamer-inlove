
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
        
      },
      {
        path: 'home',
        redirectTo: ''
      },
      //{
      //  path: 'starships',
      //  component: StarshipListComponent,
      //  canActivate: [AuthGuard],
      //  canLoad: [AuthGuard]
      //},
      //{
      //  path: 'starships/:id',
      //  component: StarshipDetailComponent,
      //  canActivate: [AuthGuard],
      //  canLoad: [AuthGuard]
      //},
      //{
      //  path: 'login',
      //  component: LoginComponent
      //},
      //{
      //  path: 'register',
      //  component: RegisterComponent
      //},
      {
        path: '**',
        redirectTo: '404'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
