
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { GameComponent } from './games/game/game.component';


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
        path: 'profile:',
        component: UserProfileComponent,
        loadChildren: () => import('./user/user-profile/user-profile-pages-routing.module').then( m => m.UserProfilePagesRoutingModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'user/:idSlug',
        component: UserProfileComponent,
      },
      {
        path: 'platform/:idSlug',
        component: GameComponent,
      },
      {
        path: 'company/:idSlug',
        component: GameComponent,
      },
      {
        path: 'game/:idSlug',
        component: GameComponent,
        loadChildren: () => import('./games/game/game-pages-routing.module').then( m => m.GamePagesRoutingModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
