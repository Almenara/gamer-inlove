import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { GameComponent } from './game.component';
import { AddToCollectComponent } from './add-to-collect/add-to-collect.component';
import { AddToWishlistComponent } from './add-to-wishlist/add-to-wishlist.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: 'game/:idSlug',
    component: GameComponent,
    children: [
      {
        path: '',
        component: InfoComponent,
        data: { scrollPositionRestoration: 'disabled' },
      },
      {
        path: 'add-to-collection',
        component: AddToCollectComponent, 
        data: { scrollPositionRestoration: 'disabled' },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'add-to-wishlist',
        component: AddToWishlistComponent,
        data: { scrollPositionRestoration: 'disabled' },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'edit',
        component: EditComponent,       
        data: { scrollPositionRestoration: 'disabled' },
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
export class GamePagesRoutingModule { }
