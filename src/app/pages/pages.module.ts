import { UserModule } from './user/user-profile/user.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

import { HomeComponent } from './home/home.component';
import { MainComponent } from './home/main/main.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { GameComponent } from './games/game/game.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    SignUpComponent,
    LogInComponent,
    UserProfileComponent,
    GameComponent
  ],
  imports: [
    UserModule,
    CommonModule,
    PagesRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent,
    MainComponent
  ]
})
export class PagesModule { }
