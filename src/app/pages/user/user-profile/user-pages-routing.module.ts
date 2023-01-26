import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { UserInfoComponent } from './user-info/user-info.component';
import { UserGameListComponent } from './user-game-list/user-game-list.component';
//import { UserPlatformListComponent } from './user-platform-list/user-platform-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'collection',
        component: UserGameListComponent,
        data: { product: 'game', filter: 'collection' }
      },
      {
        path: 'wishlist',
        component: UserGameListComponent,
        data: { product: 'game', filter: 'wishlist' }
      },
      /*{
        path: 'collection/user-game-list',
        component: UserGameListComponent,
        data: { product: 'game', filter: 'collection' }
      },
      {
        path: 'collection/user-platform-list',
        component: UserPlatformListComponent,
        data: { product: 'platform', filter: 'collection' }
      },
      {
        path: 'collection/user-game-wishlist',
        component: UserGameListComponent,
        data: { product: 'game', filter: 'wishlist' }
      },
      {
        path: 'collection/user-platform-wishlist',
        component: UserPlatformListComponent,
        data: { product: 'platform', filter: 'wishlist' }
      },*/
      {
        path: 'for-sale',
        component: UserGameListComponent,
        data: { product: 'game', filter: 'for-sale' }
      },
      /*{
        path: 'for-sale/user-game-list',
        component: UserGameListComponent,
        data: { product: 'game', filter: 'for-sale' }
      },
      {
        path: 'for-sale/user-platform-list',
        component: UserPlatformListComponent,
        data: { product: 'platform', filter: 'for-sale' }
      },*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPagesRoutingModule { }
