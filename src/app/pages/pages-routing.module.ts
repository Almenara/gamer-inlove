import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LogInComponent } from './user/log-in/log-in.component';

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
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'signup',
        redirectTo: 'sign-up'
      },
      {
        path: 'log-in',
        component: LogInComponent,
      },
      {
        path: 'login',
        redirectTo: 'log-in',
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
