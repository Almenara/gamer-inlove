import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformComponent } from './platform/platform.component';
import { AddToCollectComponent } from './platform/add-to-collect/add-to-collect.component';
import { AddToWishlistComponent } from './platform/add-to-wishlist/add-to-wishlist.component';
import { EditComponent } from './platform/edit/edit.component';



@NgModule({
  declarations: [
    PlatformComponent,
    AddToCollectComponent,
    AddToWishlistComponent,
    EditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlatformsModule { }
