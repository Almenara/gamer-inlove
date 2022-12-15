
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserProfilePagesRoutingModule } from './user-profile-pages-routing.module';

import { UserEditComponent } from './user-edit/user-edit.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { UserInfoComponent } from './user-info/user-info.component';



@NgModule({
  declarations: [
    UserInfoComponent,
    UserEditComponent,
    PasswordEditComponent
  ],
  imports: [
    CommonModule,
    UserProfilePagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UserInfoComponent,
    UserEditComponent,
    PasswordEditComponent
  ]
})
export class UserModule { }
