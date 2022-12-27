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
        path: 'password-edit',
        component: PasswordEditComponent,
      },
      {
        path: 'edit',
        component: UserEditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfilePagesRoutingModule { }
