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
import { AddressPopupComponent } from './user-profile/user-info/address-popup/address-popup.component';
import { SellGamePopupComponent } from './user-profile/user-info/sell-game-popup/sell-game-popup.component';
import { SellPlatformPopupComponent } from './user-profile/user-info/sell-platform-popup/sell-platform-popup.component';
import { UserGameListComponent } from './user-profile/user-game-list/user-game-list.component';
import { UserPlatformListComponent } from './user-profile/user-platform-list/user-platform-list.component';
import { UserPlatformWishlistComponent } from './user-profile/user-platform-wishlist/user-platform-wishlist.component';
import { UserGameWishlistComponent } from './user-profile/user-game-wishlist/user-game-wishlist.component';
import { UserForSaleComponent } from './user-profile/user-for-sale/user-for-sale.component';
import { UserGameForSaleComponent } from './user-profile/user-game-for-sale/user-game-for-sale.component';
import { UserPlatformForSaleComponent } from './user-profile/user-platform-for-sale/user-platform-for-sale.component';



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
    AddressPopupComponent,
    SellGamePopupComponent,
    SellPlatformPopupComponent,
    UserGameListComponent,
    UserPlatformListComponent,
    UserPlatformWishlistComponent,
    UserGameWishlistComponent,
    UserForSaleComponent,
    UserGameForSaleComponent,
    UserPlatformForSaleComponent,
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
    AddressPopupComponent,
  ]
})
export class UserModule { }
