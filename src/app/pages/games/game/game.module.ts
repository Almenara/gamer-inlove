
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GamePagesRoutingModule } from './game-pages-routing.module';

import { AddToCollectComponent } from './add-to-collect/add-to-collect.component';
import { AddToWishlistComponent } from './add-to-wishlist/add-to-wishlist.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    AddToCollectComponent,
    AddToWishlistComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    GamePagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddToCollectComponent,
    AddToWishlistComponent,
    EditComponent
  ]
})
export class UserModule { }
