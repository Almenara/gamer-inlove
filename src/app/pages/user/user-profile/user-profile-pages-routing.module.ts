import { AddressAddComponent } from './address-add/address-add.component';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';


const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    children: [
      {
        path: '',
        component: UserInfoComponent,
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfilePagesRoutingModule { }
