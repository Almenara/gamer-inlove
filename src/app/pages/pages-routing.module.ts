import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';


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
      {
        path: 'profile',
        component: UserProfileComponent,
        loadChildren: () => import('./user/user-profile/user-profile-pages-routing.module').then( m => m.UserProfilePagesRoutingModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
