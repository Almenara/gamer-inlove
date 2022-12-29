import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GamePagesRoutingModule } from './game/game-pages-routing.module';
import { GameComponent } from './game/game.component';
import { AddToCollectComponent } from './game/add-to-collect/add-to-collect.component';
import { AddToWishlistComponent } from './game/add-to-wishlist/add-to-wishlist.component';
import { EditComponent } from './game/edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    GameComponent,
    AddToCollectComponent,
    AddToWishlistComponent,
    EditComponent
  ],
  imports: [
    GamePagesRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    AddToCollectComponent,
    AddToWishlistComponent,
    EditComponent
  ]
})
export class GamesModule { }
