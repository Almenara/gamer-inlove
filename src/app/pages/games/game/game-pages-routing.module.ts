import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { GameComponent } from './game.component';
import { AddToCollectComponent } from './add-to-collect/add-to-collect.component';
import { AddToWishlistComponent } from './add-to-wishlist/add-to-wishlist.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'game/:idSlug',
    component: GameComponent,
    children: [
      {
        path: 'add-to-collection',
        component: AddToCollectComponent, 
      },
      {
        path: 'add-to-wishlist',
        component: AddToWishlistComponent,
      },
      {
        path: 'edit',
        component: EditComponent,       
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamePagesRoutingModule { }
