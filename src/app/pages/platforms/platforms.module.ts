import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PlatformPagesRoutingModule } from './platform/platform-pages-routing.module';
import { PlatformComponent } from './platform/platform.component';
import { AddToCollectComponent } from './platform/add-to-collect/add-to-collect.component';
import { AddToWishlistComponent } from './platform/add-to-wishlist/add-to-wishlist.component';
import { EditComponent } from './platform/edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PlatformComponent,
    AddToCollectComponent,
    AddToWishlistComponent,
    EditComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlatformPagesRoutingModule,
    SharedModule
  ],
  exports: [
    AddToCollectComponent,
    AddToWishlistComponent,
    EditComponent
  ]
})
export class PlatformsModule { }
