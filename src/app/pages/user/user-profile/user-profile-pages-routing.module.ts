import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
//import { UserInfoComponent } from './user-info/user-info.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserGameListComponent } from './user-game-list/user-game-list.component';
import { AddressAddComponent } from './address-add/address-add.component';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ChatComponent } from './conversations/chat/chat.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
//import { UserPlatformListComponent } from './user-platform-list/user-platform-list.component';


const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent, 
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
      {
        path: 'conversations',
        component: ConversationsComponent,
      },
      {
        path: 'conversations/:idConversation',
        component: ChatComponent,
      },
      {
        path: 'edit',
        component: UserEditComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'password-edit',
        component: PasswordEditComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'address-add',
        component: AddressAddComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'address-edit',
        component: AddressEditComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfilePagesRoutingModule { }
