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
      {
        path: 'for-sale',
        component: UserGameListComponent,
        data: { product: 'game', filter: 'for-sale' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPagesRoutingModule { }
