import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserGameListComponent } from './user-game-list/user-game-list.component';
import { UserPlatformListComponent } from './user-platform-list/user-platform-list.component';
import { UserGameWishlistComponent } from './user-game-wishlist/user-game-wishlist.component';
import { UserPlatformWishlistComponent } from './user-platform-wishlist/user-platform-wishlist.component';


const routes: Routes = [
  {
    path: 'user/:idSlug:',
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
        path: 'for-sale',
        component: UserInfoComponent,
      },
      {
        path: 'for-sale/user-game-list',
        component: UserGameListComponent,
      },
      {
        path: 'for-sale/user-platform-list',
        component: UserPlatformListComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfilePagesRoutingModule { }
