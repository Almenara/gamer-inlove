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



@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent,
    UserProfileComponent,
    UserInfoComponent,
    UserEditComponent,
    PasswordEditComponent
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
    PasswordEditComponent
  ]
})
export class UserModule { }
