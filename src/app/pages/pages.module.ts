import { PlatformsModule } from './platforms/platforms.module';
import { GamesModule } from './games/games.module';
import { UserModule } from './user/user.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { HomeComponent } from './home/home.component';
import { MainComponent } from './home/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { TopGalleryComponent } from './home/top-gallery/top-gallery.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    TopGalleryComponent,
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    UserModule,
    GamesModule,
    PlatformsModule,
    SharedModule
  ],
  exports: [
    HomeComponent,
    MainComponent
  ]
})
export class PagesModule { }
