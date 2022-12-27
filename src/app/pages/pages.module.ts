import { GamesModule } from './games/games.module';
import { UserModule } from './user/user.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

import { HomeComponent } from './home/home.component';
import { MainComponent } from './home/main/main.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    FormsModule, 
    UserModule,
    GamesModule,
    SharedModule
  ],
  exports: [
    HomeComponent,
    MainComponent
  ]
})
export class PagesModule { }
