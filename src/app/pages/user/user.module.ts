import { UserProfilePagesRoutingModule } from './user-profile/user-profile-pages-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserEditComponent } from './user-profile/user-edit/user-edit.component';
import { PasswordEditComponent } from './user-profile/password-edit/password-edit.component';
import { UserInfoComponent } from './user-profile/user-info/user-info.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressEditComponent } from './user-profile/address-edit/address-edit.component';
import { AddressAddComponent } from './user-profile/address-add/address-add.component';
import { SellGamePopupComponent } from './user-profile/user-game-list/sell-game-popup/sell-game-popup.component';
import { SellPlatformPopupComponent } from './user-profile/user-game-list/sell-platform-popup/sell-platform-popup.component';
import { UserGameListComponent } from './user-profile/user-game-list/user-game-list.component';
import { UserPlatformListComponent } from './user-profile/user-platform-list/user-platform-list.component';
import { ConversationsComponent } from './user-profile/conversations/conversations.component';
import { ChatComponent } from './user-profile/conversations/chat/chat.component';
import { SellGameConfirmPopupComponent } from './user-profile/conversations/chat/sell-game-confirm-popup/sell-game-confirm-popup.component';



@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent,
    UserProfileComponent,
    UserInfoComponent,
    UserEditComponent,
    PasswordEditComponent,
    AddressEditComponent,
    AddressAddComponent,
    SellGamePopupComponent,
    SellPlatformPopupComponent,
    UserGameListComponent,
    UserPlatformListComponent,
    ConversationsComponent,
    ChatComponent,
    SellGameConfirmPopupComponent,
  ],
  imports: [
    UserProfilePagesRoutingModule,
    SharedModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SignUpComponent,
    LogInComponent,
    UserProfileComponent,
    UserInfoComponent,
    UserEditComponent,
    PasswordEditComponent,
    AddressEditComponent,
    AddressAddComponent,
  ]
})
export class UserModule { }
