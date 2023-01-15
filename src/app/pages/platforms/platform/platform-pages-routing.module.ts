import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { PlatformComponent} from './platform.component';
import { AddToCollectComponent } from './add-to-collect/add-to-collect.component';
import { AddToWishlistComponent } from './add-to-wishlist/add-to-wishlist.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';
import { ForSaleListComponent } from './for-sale-list/for-sale-list.component';

const routes: Routes = [
  {
    path: 'platform/:idSlug',
    component: PlatformComponent,
    children: [
      {
        path: '',
        component: InfoComponent,
      },
      {
        path: 'for-sale-list',
        component: ForSaleListComponent,
      },
      {
        path: 'add-to-collection',
        component: AddToCollectComponent, 
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'add-to-wishlist',
        component: AddToWishlistComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'edit',
        component: EditComponent,      
        canActivate: [AuthGuard],
        canLoad: [AuthGuard], 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformPagesRoutingModule { }
