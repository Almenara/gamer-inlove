
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserGameListComponent } from './user-game-list/user-game-list.component';
import { AddressAddComponent } from './address-add/address-add.component';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { UserPlatformListComponent } from './user-platform-list/user-platform-list.component';
import { UserGameWishlistComponent } from './user-game-wishlist/user-game-wishlist.component';
import { UserPlatformWishlistComponent } from './user-platform-wishlist/user-platform-wishlist.component';


const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    children: [
      {
        path: 'collection',
        component: UserInfoComponent,
      },
      {
        path: 'collection/user-game-list',
        component: UserGameListComponent,
      },
      {
        path: 'collection/user-platform-list',
        component: UserPlatformListComponent,
      },
      {
        path: 'collection/user-game-wishlist',
        component: UserGameWishlistComponent,
      },
      {
        path: 'collection/user-platform-wishlist',
        component: UserPlatformWishlistComponent,
      },
      {
        path: 'edit',
        component: UserEditComponent,
      },
      {
        path: 'password-edit',
        component: PasswordEditComponent,
      },
      {
        path: 'address-add',
        component: AddressAddComponent,
      },
      {
        path: 'address-edit',
        component: AddressEditComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfilePagesRoutingModule { }
